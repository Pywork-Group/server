import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from './api/auth/auth.module'
import { CaseModule } from './api/case/case.module'
import { CasinoModule } from './api/casino/casino.module'
import { CategoryModule } from './api/category/category.module'
import { SkinModule } from './api/skin/skin.module'
import { SocketModule } from './api/socket/socket.module'
import { TelegramModule } from './api/telegram/telegram.module'
import { UserModule } from './api/user/user.module'
import { WinModule } from './api/win/win.module'
import { getGraphQLConfig } from './config/graphql.config'
import { GlobalModule } from './modules/global.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		GraphQLModule.forRootAsync({
			driver: ApolloDriver,
			useFactory: getGraphQLConfig,
		}),
		GlobalModule,
		UserModule,
		AuthModule,
		SkinModule,
		CaseModule,
		WinModule,
		SocketModule,
		CasinoModule,
		CategoryModule,
		TelegramModule,
	],
})
export class AppModule {}
