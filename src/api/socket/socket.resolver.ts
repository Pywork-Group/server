import { Args, Int, Resolver, Subscription } from '@nestjs/graphql'
import { Statistic } from '../casino/entities/statistics/statistics.entity'
import { Win } from '../win/entity/win.entity'
import { SocketService } from './socket.service'

@Resolver()
export class SocketResolver {
	constructor(private readonly socketService: SocketService) {}

	@Subscription(() => Win, {
		nullable: true,
		name: 'liveWins',
		filter: (payload, variables, _) => {
			const userId = variables?.userId

			if (!userId) return payload.live

			return payload.liveWins.user.id !== userId
		},
	})
	async wins(
		@Args('userId', { type: () => Int, nullable: true }) userId?: number
	) {
		return this.socketService.wins()
	}

	@Subscription(() => Statistic, {
		nullable: true,
		name: 'liveStatistics',
	})
	async statistic() {
		return this.socketService.statistics()
	}
}
