import { registerEnumType } from '@nestjs/graphql'

export enum Stat {
	WIN = 'WIN',
	CASE = 'CASE',
	CONTRACT = 'CONTRACT',
}

registerEnumType(Stat, {
	name: 'Stat',
})
