import { Field, ObjectType } from '@nestjs/graphql'
import { Case } from 'src/api/case/entities/case/case.entity'
import { Rarity } from 'src/shared/enums/rarity/rarity.enum'
import { Quality } from '../quality/quality.entity'
import { Skin } from '../skin/skin.entity'

@ObjectType()
export class CurrentSkin {
	@Field(() => String)
	nameRu: string

	@Field(() => String)
	nameEn: string

	@Field(() => String)
	imagePath: string

	@Field(() => Rarity)
	rarity: Rarity

	@Field(() => [Quality])
	qualities: Quality[]

	@Field(() => [Case])
	cases: Case[]

	@Field(() => [Skin])
	similarSkins: Skin[]
}
