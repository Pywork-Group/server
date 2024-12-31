import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserInfo {
	@Field(() => Int)
	id: number

	@Field(() => String)
	username: string

	@Field(() => String)
	avatarPath: string
}
