import { Field, ObjectType } from '@nestjs/graphql'
import { Case } from 'src/api/case/entities/case/case.entity'

@ObjectType()
export class Category {
	@Field(() => String)
	nameRu: string

	@Field(() => String)
	nameEn: string

	@Field(() => [Case])
	cases: Case[]
}
