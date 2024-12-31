import { Controller, Get, HttpCode, Req, Res } from '@nestjs/common'
import type { Response } from 'express'
import type { GqlRequest } from 'src/shared/types/gql-context.type'
import { AuthService } from './auth.service'
import { Steam } from './decorators/steam.decorator'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Steam()
	@HttpCode(200)
	@Get('steam')
	async auth(@Req() request: GqlRequest, @Res() response: Response) {
		try {
			const user = request.user

			await this.authService.issueTokens(user.id, response)

			return response.redirect(process.env.NEXT_APP_URL)
		} catch (error) {
			console.log(error)
		}
	}
}
