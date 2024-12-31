import { registerEnumType } from '@nestjs/graphql'

export enum Rarity {
	CONSUMER = 'CONSUMER',
	MIL_SPEC = 'MIL_SPEC',
	INDUSTRIAL = 'INDUSTRIAL',
	RESTRICTED = 'RESTRICTED',
	CLASSIFIED = 'CLASSIFIED',
	COVERT = 'COVERT',
	GOLD = 'GOLD',
}

registerEnumType(Rarity, {
	name: 'Rarity',
})
