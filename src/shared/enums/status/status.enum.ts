import { registerEnumType } from '@nestjs/graphql'

export enum Status {
	WON = 'WON',
	CONTRACTED = 'CONTRACTED',
	UPGRADED = 'UPGRADED',
	SOLD = 'SOLD',
	RECEIVED = 'RECEIVED',
	REQUESTED = 'REQUESTED',
}

registerEnumType(Status, {
	name: 'Status',
})
