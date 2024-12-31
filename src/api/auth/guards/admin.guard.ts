import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AUTH_ERROR } from 'src/errors/auth/auth.error'
import { UserRole } from 'src/shared/enums/user-role/user-role.enum'
import type { ICurrentUser } from 'src/shared/interfaces/user/user.interface'

export class OnlyAdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context)
		const request = ctx.getContext().req

		const user: ICurrentUser = request.user

		if (user.role !== UserRole.ADMIN) {
			return AUTH_ERROR.NOT_ENOUGH_RIGHTS()
		}

		return true
	}
}
