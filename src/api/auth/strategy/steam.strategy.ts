import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-steam'
import { UserService } from 'src/api/user/user.service'
import { AuthService } from '../auth.service'

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService
	) {
		super({
			returnURL: `${process.env.NEST_APP_URL}/api/auth/steam`,
			realm: `${process.env.NEST_APP_URL}/api`,
			apiKey: process.env.STEAM_TOKEN,
		})
	}

	async validate(_, profile: any) {
		const steamId = profile.id

		let user = await this.userService.bySteamId(steamId)

		if (!user) {
			user = await this.authService.register({
				steamId,
				username: profile.displayName,
				avatarPath: profile.photos[2].value,
			})
		}

		return user
	}
}
