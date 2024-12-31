import { UseGuards, applyDecorators } from '@nestjs/common'
import { UserRole } from 'src/shared/enums/user-role/user-role.enum'
import { OnlyAdminGuard } from '../guards/admin.guard'
import { AuthGuard } from '../guards/auth.guard'
import { OptionalAuthGuard } from '../guards/optional-auth.guard'

export const Auth = (
	type: 'required' | 'optional' = 'required',
	role?: UserRole
) =>
	applyDecorators(
		type === 'optional'
			? UseGuards(OptionalAuthGuard)
			: role === UserRole.ADMIN
			? UseGuards(AuthGuard, OnlyAdminGuard)
			: UseGuards(AuthGuard)
	)
