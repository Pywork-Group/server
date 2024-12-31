import { registerEnumType } from '@nestjs/graphql'

export enum UserRole {
	ADMIN = 'ADMIN',
	MODERATOR = 'MODERATOR',
	SUPPORT = 'SUPPORT',
	PLAYER = 'PLAYER',
}

registerEnumType(UserRole, {
	name: 'UserRole',
})
