import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Auth } from '../auth/decorators/auth.decorator'
import { Skin } from '../skin/entities/skin/skin.entity'
import { CurrentUser } from '../user/decorator/current-user.decorator'
import { CaseService } from './case.service'
import { CurrentCase } from './entities/current-case/current-case.entity'

@Resolver()
export class CaseResolver {
	constructor(private readonly caseService: CaseService) {}

	@Query(() => CurrentCase, { name: 'currentCase' })
	async getCurrentCase(@Args('slug') slug: string) {
		return this.caseService.getCurrentCase(slug)
	}

	@Auth()
	@Mutation(() => [[Skin]], { name: 'openCase' })
	async openCase(
		@Args('slug') slug: string,
		@Args('times', { type: () => Int }) times: number,
		@CurrentUser('id') id: number
	) {
		return this.caseService.openCase(slug, times, id)
	}
}
