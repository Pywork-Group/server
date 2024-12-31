import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
	controllers: [AuthController],
	providers: [AuthResolver, AuthService],
})
export class AuthModule {}
