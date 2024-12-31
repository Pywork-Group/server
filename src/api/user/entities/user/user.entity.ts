import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Decimal } from 'src/scalars/decimal.scalar'
import { Currency } from 'src/shared/enums/currency/currency.enum'

@ObjectType()
export class User {
	@Field(() => Int)
	id: number

	@Field(() => String)
	steamId: string

	@Field(() => String)
	username: string

	@Field(() => String)
	avatarPath: string

	@Field(() => Decimal, { nullable: true })
	balance?: number

	@Field(() => String, { nullable: true })
	tradeLink?: string

	@Field(() => Currency, { nullable: true })
	currency?: Currency
}
