import { registerEnumType } from '@nestjs/graphql'

export enum Wear {
	FACTORY_NEW = 'FACTORY_NEW',
	MINIMAL_WEAR = 'MINIMAL_WEAR',
	FIELD_TESTED = 'FIELD_TESTED',
	WELL_WORN = 'WELL_WORN',
	BATTLE_SCARRED = 'BATTLE_SCARRED',
}

registerEnumType(Wear, {
	name: 'Wear',
})
