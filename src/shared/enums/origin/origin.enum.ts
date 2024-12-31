import { registerEnumType } from '@nestjs/graphql'

export enum Origin {
	CASE = 'CASE',
	CONTRACT = 'CONTRACT',
	UPGRADE = 'UPGRADE',
}

registerEnumType(Origin, {
	name: 'Origin',
})
