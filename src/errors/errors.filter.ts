import { Catch } from '@nestjs/common'
import {
	GqlArgumentsHost,
	type GqlExceptionFilter,
	GqlExecutionContext,
} from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { EnumLanguage } from 'src/shared/enums/language/language.enum'
import { CASINO_ERROR_MESSAGE } from './casino/casino.error'

@Catch()
export class AllExceptionsFilter implements GqlExceptionFilter {
	catch(exception: any, host: GqlArgumentsHost) {
		const context = GqlExecutionContext.create(host)

		const headers = context.getContext().req.headers

		const language = headers['language'] || EnumLanguage.RU

		const error = exception.response
		const status = exception.status
		console.log(exception)
		const message = error?.[language] || CASINO_ERROR_MESSAGE[language]

		return new GraphQLError(message, {
			extensions: {
				code: status || 'INTERNAL_SERVER_ERROR',
			},
		})
	}
}
