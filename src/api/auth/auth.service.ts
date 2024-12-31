import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { Response } from 'express'
import { IS_PRODUCTION } from 'src/constants/global/global.constants'
import { AUTH_ERROR } from 'src/errors/auth/auth.error'
import { PrismaService } from 'src/prisma/prisma.service'
import { EnumCookie } from 'src/shared/enums/cookie/cookie.enum'
import { Currency } from 'src/shared/enums/currency/currency.enum'
import type { GqlRequest } from 'src/shared/types/gql-context.type'
import { AUTH_USER_SELECT } from '../user/selects/auth/auth-user.select'
import { UserService } from '../user/user.service'
import type { AuthInput } from './input/auth.input'

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	// TODO: CURRENCY
	async register(input: AuthInput) {
		return this.prisma.user.create({
			data: {
				steamId: input.steamId,
				profile: {
					create: {
						username: input.username,
						avatarPath: input.avatarPath,
					},
				},
				currency: Currency.RUB,
			},
			select: AUTH_USER_SELECT,
		})
	}

	async logout(response: Response) {
		await this.removeToken(response, EnumCookie.ACCESS_TOKEN)
		await this.removeToken(response, EnumCookie.REFRESH_TOKEN)
	}

	async checkAccessToken(
		accessToken: string,
		refreshToken: string,
		request: GqlRequest,
		response: Response
	) {
		let userId: number | null = null

		try {
			const accessResult = await this.jwtService.verifyAsync(accessToken, {
				secret: process.env.ACCESS_TOKEN_JWT_SECRET,
			})

			userId = accessResult.id
		} catch {
			return this.generateAccessToken(refreshToken, request, response)
		}

		const user = await this.userService.byId(userId)

		if (!user) {
			await this.logout(response)

			return AUTH_ERROR.EXPIRED()
		}

		request.user = user
	}

	async issueTokens(userId: number, response: Response) {
		const jwtData = { id: userId }

		const accessToken = await this.jwtService.signAsync(jwtData, {
			expiresIn: `${process.env.ACCESS_TOKEN_EXPIRE_MINUTES}m`,
			secret: process.env.ACCESS_TOKEN_JWT_SECRET,
		})

		const refreshToken = await this.jwtService.signAsync(jwtData, {
			expiresIn: `${process.env.REFRESH_TOKEN_EXPIRE_DAYS}d`,
			secret: process.env.REFRESH_TOKEN_JWT_SECRET,
		})

		await this.setToken(response, accessToken, EnumCookie.ACCESS_TOKEN)
		await this.setToken(response, refreshToken, EnumCookie.REFRESH_TOKEN)
	}

	async generateAccessToken(
		refreshToken: string,
		request: GqlRequest,
		response: Response
	) {
		try {
			const refreshResult = await this.jwtService.verifyAsync(refreshToken, {
				secret: process.env.REFRESH_TOKEN_JWT_SECRET,
			})

			const user = await this.userService.byId(refreshResult.id)

			request.user = user

			await this.issueTokens(user.id, response)
		} catch {
			await this.logout(response)

			return AUTH_ERROR.EXPIRED()
		}
	}

	async removeToken(response: Response, type: EnumCookie) {
		response.clearCookie(type, {
			httpOnly: true,
			domain: process.env.DOMAIN,
			secure: IS_PRODUCTION,
			path: '/',
			sameSite: 'strict',
		})
	}

	async setToken(response: Response, token: string, type: EnumCookie) {
		const expires = new Date()

		if (type === EnumCookie.ACCESS_TOKEN) {
			expires.setTime(expires.getTime() + 2 * 60 * 1000)
		} else if (type === EnumCookie.REFRESH_TOKEN) {
			expires.setDate(expires.getDate() + 1)
		}

		response.cookie(type, token, {
			httpOnly: true,
			domain: process.env.DOMAIN,
			expires,
			secure: IS_PRODUCTION,
			path: '/',
			sameSite: 'lax',
		})
	}
}
