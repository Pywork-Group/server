import { IS_PRODUCTION } from 'src/constants/global/global.constants'

export const getGraphQLConfig = () => {
	return {
		path: '/api/mygraphql',
		subscriptions: {
			'graphql-ws': {
				path: '/api/mygraphql',
			},
		},
		playground: !IS_PRODUCTION,
		autoSchemaFile: `${process.cwd()}/src/schema/schema.gql`,
		sortSchema: true,
		context: ({ req, res }) => ({
			req,
			res,
		}),
		formatError: (err) => ({
			message: err.message,
			status: err.extensions.code,
		}),
	}
}
