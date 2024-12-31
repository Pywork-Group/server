import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Decimal } from 'src/scalars/decimal.scalar'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorator/current-user.decorator'
import { Wins } from './entity/win.entity'
import { WinsQueryInput } from './input/query.input'
import { WinService } from './win.service'

@Resolver()
export class WinResolver {
	constructor(private readonly winService: WinService) {}

	@Auth('optional')
	@Query(() => Wins, { name: 'wins' })
	async getWins(
		@Args('query') input: WinsQueryInput,
		@CurrentUser('id') userId: number
	) {
		return this.winService.getWins(input, userId)
	}

	@Auth()
	@Mutation(() => [Int], { name: 'sellWins' })
	async sellWins(
		@Args('items', { type: () => [Int] }) items: number[],
		@CurrentUser('id') userId: number
	) {
		return this.winService.sellWins(userId, items)
	}

	@Auth()
	@Mutation(() => Decimal, { name: 'sellAllWins' })
	async sellAllWins(@CurrentUser('id') userId: number) {
		return this.winService.sellAllWins(userId)
	}

	@Auth()
	@Mutation(() => Int, { name: 'requestWin' })
	async requestWin(
		@Args('winId', { type: () => Int }) winId: number,
		@CurrentUser('id') userId: number
	) {
		return this.winService.requestWin(winId, userId)
	}
}
