import { Inject, Injectable } from '@nestjs/common'
import type { PubSubEngine } from 'graphql-subscriptions'
import type { Statistic } from '../casino/entities/statistics/statistics.entity'
import { SOCKET_EVENT } from './event/socket.event'

@Injectable()
export class SocketService {
	constructor(@Inject('PUB_SUB') private readonly pubSub: PubSubEngine) {}

	async wins() {
		return this.pubSub.asyncIterableIterator(SOCKET_EVENT.WINS)
	}

	async triggerWins(win: any) {
		this.pubSub.publish(SOCKET_EVENT.WINS, { liveWins: win })

		return win
	}

	async statistics() {
		return this.pubSub.asyncIterableIterator(SOCKET_EVENT.STATISTICS)
	}

	async triggerStatistics(data: Statistic) {
		this.pubSub.publish(SOCKET_EVENT.STATISTICS, { liveStatistics: data })

		return data
	}
}
