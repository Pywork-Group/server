import { Field, InputType, Int } from '@nestjs/graphql'
import { PaginationInput } from 'src/pagination/input/pagination.input'
import { Status } from 'src/shared/enums/status/status.enum'

@InputType()
export class WinsQueryInput extends PaginationInput {
	@Field(() => Int, { nullable: true })
	userId?: number

	@Field(() => Status, { nullable: true })
	status?: Status

	@Field(() => Boolean, { nullable: true })
	isUserRequired?: boolean

	@Field(() => Boolean, { nullable: true })
	isNotUser?: boolean
}
