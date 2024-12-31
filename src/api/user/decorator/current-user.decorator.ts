import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import type { ICurrentUser } from 'src/shared/interfaces/user/user.interface'

export const CurrentUser = createParamDecorator(
	(data: keyof ICurrentUser, ctx: ExecutionContext) => {
		let user: ICurrentUser

		if (ctx.getType() === 'http') {
			user = ctx.switchToHttp().getRequest().user
		} else {
			const context = GqlExecutionContext.create(ctx)
			user = context.getContext().req.user
		}

		return user ? user[data] : null
	}
)
