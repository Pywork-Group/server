import { Field, Int, ObjectType } from '@nestjs/graphql'
import { CaseInfo } from 'src/api/case/entities/case-info/case-info.entity'
import { UserInfo } from 'src/api/user/entities/user-info/user-info.entity'
import { Decimal } from 'src/scalars/decimal.scalar'
import { Origin } from 'src/shared/enums/origin/origin.enum'
import { Rarity } from 'src/shared/enums/rarity/rarity.enum'
import { Status } from 'src/shared/enums/status/status.enum'
import { Wear } from 'src/shared/enums/wear/wear.enum'

@ObjectType()
export class Win {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	skinId: number

	@Field(() => String)
	nameRu: string

	@Field(() => String)
	nameEn: string

	@Field(() => String)
	imagePath: string

	@Field(() => Rarity)
	rarity: Rarity

	@Field(() => Wear)
	wear: Wear

	@Field(() => Decimal)
	priceRUB: number

	@Field(() => Decimal)
	priceUSD: number

	@Field(() => Decimal)
	priceEUR: number

	@Field(() => CaseInfo, { nullable: true })
	case?: CaseInfo

	@Field(() => UserInfo)
	user: UserInfo

	@Field(() => Origin)
	origin: Origin

	@Field(() => Status)
	status: Status

	@Field(() => Boolean)
	isStatTrak: boolean
}

@ObjectType()
export class Wins {
	@Field(() => [Win])
	wins: Win[]

	@Field(() => Int)
	count: number
}
