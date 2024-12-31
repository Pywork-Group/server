import type { UserRole } from '@prisma/client'

export interface ICurrentUser {
	id: number
	role: UserRole
}
