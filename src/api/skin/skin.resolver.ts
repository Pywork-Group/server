import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { CurrentSkin } from './entities/current-skin/current-skin.entity'
import { SkinService } from './skin.service'

@Resolver()
export class SkinResolver {
	constructor(private readonly skinService: SkinService) {}

	@Query(() => CurrentSkin, { name: 'currentSkin' })
	async getCurrentSkin(@Args('id', { type: () => Int }) id: number) {
		return this.skinService.getCurrentSkin(id)
	}
}
