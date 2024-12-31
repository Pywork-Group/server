import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Decimal } from 'src/scalars/decimal.scalar'
import { Currency } from 'src/shared/enums/currency/currency.enum'

@ObjectType()
export class CurrentUser {
	@Field(() => Int)
	id: number

	@Field(() => String)
	username: string

	@Field(() => String)
	avatarPath: string

	@Field(() => Decimal)
	balance: number

	@Field(() => Currency)
	currency: Currency
}
