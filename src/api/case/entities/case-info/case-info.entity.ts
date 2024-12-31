import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CaseInfo {
	@Field(() => String)
	imagePath: string

	@Field(() => String)
	slug: string
}
