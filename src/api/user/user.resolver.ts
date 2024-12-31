import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from './decorator/current-user.decorator'
import { CurrentUser as CurrentUserEntity } from './entities/current-user/current-user.entity'
import { User } from './entities/user/user.entity'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Query(() => CurrentUserEntity, { name: 'currentUser' })
	async getCurrentUser(@CurrentUser('id') id: number) {
		return this.userService.getCurrentUser(id)
	}

	@Auth('optional')
	@Query(() => User, { name: 'user' })
	async getUser(
		@Args('id', { type: () => Int }) id: number,
		@CurrentUser('id') userId: number
	) {
		return this.userService.getUser(id, userId)
	}

	@Auth()
	@Mutation(() => String, { name: 'updateTradeLink' })
	async updateTradeLink(
		@CurrentUser('id') id: number,
		@Args('tradeLink', { type: () => String }) tradeLink: string
	) {
		return this.userService.updateTradeLink(id, tradeLink)
	}
}
