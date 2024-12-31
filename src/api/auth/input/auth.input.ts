import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AuthInput {
	@Field(() => String)
	steamId: string

	@Field(() => String)
	username: string

	@Field(() => String)
	avatarPath: string
}
