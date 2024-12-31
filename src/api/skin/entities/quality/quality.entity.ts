import { Field, ObjectType } from '@nestjs/graphql'
import { Decimal } from 'src/scalars/decimal.scalar'
import { Wear } from 'src/shared/enums/wear/wear.enum'

@ObjectType()
export class Quality {
	@Field(() => Decimal)
	priceRUB: number

	@Field(() => Decimal)
	priceUSD: number

	@Field(() => Decimal)
	priceEUR: number

	@Field(() => Decimal)
	statTrakPriceRUB: number

	@Field(() => Decimal)
	statTrakPriceUSD: number

	@Field(() => Decimal)
	statTrakPriceEUR: number

	@Field(() => Wear)
	wear: Wear
}
