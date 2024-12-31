import { Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'
import { SocketResolver } from './socket.resolver'
import { SocketService } from './socket.service'

@Module({
	providers: [
		SocketResolver,
		SocketService,
		{
			provide: 'PUB_SUB',
			useValue: new PubSub(),
		},
	],
	exports: [SocketService],
})
export class SocketModule {}
