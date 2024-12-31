import { Field, ObjectType } from '@nestjs/graphql'
import { Skin } from 'src/api/skin/entities/skin/skin.entity'
import { Case } from '../case/case.entity'

@ObjectType()
export class CurrentCase extends Case {
	@Field(() => [Skin])
	skins: Skin[]
}
