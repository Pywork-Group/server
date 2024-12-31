import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorator/current-user.decorator'
import { Win } from '../win/entity/win.entity'
import { CasinoService } from './casino.service'
import { Statistics } from './entities/statistics/statistics.entity'

@Resolver()
export class CasinoResolver {
	constructor(private readonly casinoService: CasinoService) {}

	@Query(() => Statistics, { name: 'statistics' })
	async getStatistics() {
		return this.casinoService.getStatistics()
	}

	@Auth()
	@Mutation(() => Win, { name: 'contract' })
	async contract(
		@Args('items', { type: () => [Int!] }) items: number[],
		@CurrentUser('id') id: number
	) {
		return this.casinoService.contract(items, id)
	}
}
