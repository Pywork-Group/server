import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Win } from 'src/api/win/entity/win.entity'
import { Decimal } from 'src/scalars/decimal.scalar'
import { Rarity } from 'src/shared/enums/rarity/rarity.enum'
import { Status } from 'src/shared/enums/status/status.enum'
import { Wear } from 'src/shared/enums/wear/wear.enum'

@ObjectType()
export class Skin {
	@Field(() => Int)
	id: number

	@Field(() => String)
	nameRu: string

	@Field(() => String)
	nameEn: string

	@Field(() => String)
	imagePath: string

	@Field(() => Decimal, { nullable: true })
	priceRUB?: number

	@Field(() => Decimal, { nullable: true })
	priceUSD?: number

	@Field(() => Decimal, { nullable: true })
	priceEUR?: number

	@Field(() => Rarity)
	rarity: Rarity

	@Field(() => Wear, { nullable: true })
	wear?: Wear

	@Field(() => Status, { nullable: true })
	status?: Status

	@Field(() => Win, { nullable: true })
	win?: Win

	@Field(() => Boolean, { nullable: true })
	isStatTrak?: boolean
}
