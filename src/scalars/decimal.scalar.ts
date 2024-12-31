import { GraphQLScalarType, Kind } from 'graphql'

export const Decimal = new GraphQLScalarType({
	name: 'Decimal',
	description:
		'Decimal scalar type that ensures the value is a number with 2 decimal places',

	serialize(value: number | string): number {
		return parseFloat(Number(value).toFixed(2))
	},

	parseValue(value: number | string): number {
		return parseFloat(Number(value).toFixed(2))
	},

	parseLiteral(ast): number {
		if (ast.kind === Kind.FLOAT || ast.kind === Kind.INT) {
			return parseFloat(Number(ast.value).toFixed(2))
		}
		return null
	},
})
