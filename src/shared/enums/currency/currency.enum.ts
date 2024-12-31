import { registerEnumType } from '@nestjs/graphql'

export enum Currency {
	RUB = 'RUB',
	USD = 'USD',
	EUR = 'EUR',
}

registerEnumType(Currency, {
	name: 'Currency',
})
