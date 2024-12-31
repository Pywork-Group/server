import { Global, Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from 'src/api/auth/auth.service'
import { SteamStrategy } from 'src/api/auth/strategy/steam.strategy'
import { UserService } from 'src/api/user/user.service'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Global()
@Module({
	providers: [
		PaginationService,
		PrismaService,
		SteamStrategy,
		JwtService,
		AuthService,
		UserService,
	],
	exports: [
		PaginationService,
		PrismaService,
		SteamStrategy,
		JwtService,
		AuthService,
		UserService,
	],
})
export class GlobalModule {}
