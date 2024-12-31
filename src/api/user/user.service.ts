import { Injectable } from '@nestjs/common'
import { USER_ERROR } from 'src/errors/user/user.error'
import { PrismaService } from 'src/prisma/prisma.service'
import { tradeLinkRegex } from 'src/utils/regex/trade-link.regex'
import { AUTH_USER_SELECT } from './selects/auth/auth-user.select'
import { CURRENT_USER_SELECT } from './selects/current-user/current-user.select'
import { USER_SELECT } from './selects/user/user.select'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getCurrentUser(id: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
			select: CURRENT_USER_SELECT,
		})

		if (!user) {
			return USER_ERROR.NOT_FOUND()
		}

		return {
			id: user.id,
			balance: user.balance,
			username: user.profile.username,
			avatarPath: user.profile.avatarPath,
			currency: user.currency,
		}
	}

	async getUser(id: number, authId: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
			select: USER_SELECT,
		})

		if (!user) {
			return USER_ERROR.NOT_FOUND()
		}

		const isCurrent = authId === id

		return {
			id: user.id,
			steamId: user.steamId,
			username: user.profile.username,
			avatarPath: user.profile.avatarPath,
			...(isCurrent && {
				balance: user.balance,
				tradeLink: user.profile.tradeLink,
				currency: user.currency,
			}),
		}
	}

	async byId(id: number) {
		return this.prisma.user.findUnique({
			where: {
				id,
			},
			select: AUTH_USER_SELECT,
		})
	}

	async bySteamId(steamId: string) {
		return this.prisma.user.findUnique({
			where: {
				steamId,
			},
			select: AUTH_USER_SELECT,
		})
	}

	async updateBalance(
		id: number,
		amount: number,
		type: 'increment' | 'decrement'
	) {
		return this.prisma.user.update({
			where: {
				id,
			},
			data: {
				balance: {
					[type]: amount,
				},
			},
		})
	}

	async updateTradeLink(id: number, link: string) {
		if (!tradeLinkRegex.test(link)) return USER_ERROR.TRADE_NOT_VALID()

		const url = new URL(link)
		const partnerId = BigInt(url.searchParams.get('partner'))

		const { steamId } = await this.prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				steamId: true,
			},
		})

		const calculatedSteamId = partnerId + BigInt('76561197960265728')

		if (String(calculatedSteamId) !== String(steamId))
			return USER_ERROR.TRADE_NOT_BELONG()

		const { tradeLink } = await this.prisma.profile.update({
			where: {
				userId: id,
			},
			data: {
				tradeLink: link,
			},
			select: {
				tradeLink: true,
			},
		})

		return tradeLink
	}
}
