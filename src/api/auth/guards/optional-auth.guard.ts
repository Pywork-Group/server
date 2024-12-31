import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { EnumCookie } from 'src/shared/enums/cookie/cookie.enum'
import { AuthService } from '../auth.service'

@Injectable()
export class OptionalAuthGuard implements CanActivate {
	constructor(private readonly authService: AuthService) {}

	async canActivate(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context)
		const request = ctx.getContext().req
		const response = ctx.getContext().res

		const cookiesRefreshToken = request.cookies[EnumCookie.REFRESH_TOKEN]

		if (!cookiesRefreshToken) return true

		const cookiesAccessToken = request.cookies[EnumCookie.ACCESS_TOKEN]

		if (!cookiesAccessToken) {
			await this.authService.generateAccessToken(
				cookiesRefreshToken,
				request,
				response
			)

			return true
		}

		await this.authService.checkAccessToken(
			cookiesAccessToken,
			cookiesRefreshToken,
			request,
			response
		)

		return true
	}
}
