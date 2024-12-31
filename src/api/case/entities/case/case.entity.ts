import { Field, ObjectType } from '@nestjs/graphql'
import { Decimal } from 'src/scalars/decimal.scalar'
import { CaseInfo } from '../case-info/case-info.entity'

@ObjectType()
export class Case extends CaseInfo {
	@Field(() => String)
	nameRu: string

	@Field(() => String)
	nameEn: string

	@Field(() => String)
	slug: string

	@Field(() => Decimal, { nullable: true })
	oldPriceRUB?: number

	@Field(() => Decimal, { nullable: true })
	oldPriceUSD?: number

	@Field(() => Decimal, { nullable: true })
	oldPriceEUR?: number

	@Field(() => Decimal)
	priceRUB: number

	@Field(() => Decimal)
	priceUSD: number

	@Field(() => Decimal)
	priceEUR: number
}
