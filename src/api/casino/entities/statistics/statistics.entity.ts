import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Stat } from 'src/shared/enums/stat/stat.enum'

@ObjectType()
export class Statistic {
	@Field(() => Int)
	increment: number

	@Field(() => Stat)
	stat: Stat
}

@ObjectType()
export class Statistics {
	@Field(() => Int)
	wins: number

	@Field(() => Int)
	cases: number

	@Field(() => Int)
	contracts: number
}
