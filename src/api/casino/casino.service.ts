import { Injectable } from '@nestjs/common'
import { CASINO_ERROR } from 'src/errors/casino/casino.error'
import { USER_ERROR } from 'src/errors/user/user.error'
import { PrismaService } from 'src/prisma/prisma.service'
import { Origin } from 'src/shared/enums/origin/origin.enum'
import { Stat } from 'src/shared/enums/stat/stat.enum'
import { Status } from 'src/shared/enums/status/status.enum'
import { formatSkinName } from 'src/utils/formats/skin-name/format-skin-name.util'
import { fieldCurrency } from 'src/utils/helpers/currency/field-currency.util'
import { QUALITY_SELECT } from '../skin/selects/quality/quality.select'
import { SocketService } from '../socket/socket.service'
import { USER_INFO_SELECT } from '../user/selects/info/user-info.select'
import { WIN_SELECT } from '../win/select/win.select'
import { METRICS_SELECT } from './selects/metrics/metrics.select'
import { PRICE_SELECT } from './selects/price/price.select'

@Injectable()
export class CasinoService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly socketService: SocketService
	) {}

	async getStatistics() {
		const [wins, contractMetrics, caseMetrics] = await this.prisma.$transaction(
			[
				this.prisma.win.count(),
				this.prisma.metrics.findFirst({
					where: {
						caseId: null,
					},
					select: {
						count: true,
					},
				}),
				this.prisma.metrics.aggregate({
					where: {
						casinoId: null,
					},
					_sum: {
						count: true,
					},
				}),
			]
		)

		return {
			wins,
			contracts: contractMetrics?.count || 0,
			cases: caseMetrics?._sum?.count || 0,
		}
	}

	async contract(items: number[], userId: number) {
		return this.prisma.$transaction(async (transaction) => {
			const [userData, contract, wins] = await Promise.all([
				transaction.user.findUnique({
					where: { id: userId },
					select: USER_INFO_SELECT,
				}),
				transaction.metrics.findUnique({
					where: { casinoId: 0 },
					select: METRICS_SELECT,
				}),
				transaction.win.findMany({
					where: { id: { in: items } },
					select: { quality: { select: PRICE_SELECT } },
				}),
			])

			if (!contract) {
				return CASINO_ERROR()
			}

			if (!userData) {
				return USER_ERROR.NOT_FOUND()
			}

			const { winChance, currency } = userData

			const price = wins.reduce(
				(sum, { quality }) =>
					sum + Number(quality[fieldCurrency('price', currency)]),
				0
			)

			const smallestPrice = (price * 25) / 100
			const biggestPrice = price * 4

			const spent = Number(contract[fieldCurrency('spent', currency)]) + price
			const spentWithoutProfit =
				(spent * (100 - contract.profitPercentage)) / 100
			const profit = spent - spentWithoutProfit

			const maxPrize =
				Number(contract[fieldCurrency('prize', currency)]) +
				(price * (100 - contract.profitPercentage)) / 100

			const eligibleDrops = await this.prisma.quality.findMany({
				where: {
					[fieldCurrency('price', currency)]: {
						gte: smallestPrice,
						lte: Math.min(maxPrize, biggestPrice),
					},
				},
				select: QUALITY_SELECT,
			})

			let chosenDrop
			if (eligibleDrops.length > 0) {
				const count = Math.max(
					1,
					Math.round(eligibleDrops.length / (winChance / 100))
				)
				const sortedDrops = eligibleDrops
					.sort(
						(a, b) =>
							Number(b[fieldCurrency('price', currency)]) -
							Number(a[fieldCurrency('price', currency)])
					)
					.slice(0, count)
				chosenDrop = sortedDrops[Math.floor(Math.random() * sortedDrops.length)]
			} else {
				chosenDrop = await this.prisma.quality.findFirst({
					where: { [fieldCurrency('price', currency)]: { gte: smallestPrice } },
					orderBy: { [fieldCurrency('price', currency)]: 'asc' },
					select: QUALITY_SELECT,
				})
			}

			const [_, newWin, updatedMetrics] = await Promise.all([
				transaction.win.updateMany({
					where: { id: { in: items } },
					data: {
						status: Status.CONTRACTED,
					},
				}),
				transaction.win.create({
					data: {
						user: { connect: { id: userId } },
						quality: { connect: { id: chosenDrop.id } },
						skin: { connect: { id: chosenDrop.skinId } },
						origin: Origin.CONTRACT,
					},
					select: WIN_SELECT,
				}),
				transaction.metrics.update({
					where: { casinoId: 0 },
					data: {
						[fieldCurrency('profit', currency)]: profit,
						[fieldCurrency('spent', currency)]: spent,
						[fieldCurrency('reward', currency)]: {
							increment: chosenDrop[fieldCurrency('price', currency)],
						},
						[fieldCurrency('prize', currency)]:
							spentWithoutProfit -
							(Number(contract[fieldCurrency('reward', currency)]) +
								Number(chosenDrop[fieldCurrency('price', currency)])),
						count: { increment: 1 },
					},
				}),
			])

			await this.socketService.triggerWins({
				nameRu: formatSkinName(newWin.skin.nameRu),
				nameEn: formatSkinName(newWin.skin.nameEn),
				imagePath: newWin.skin.imagePath,
				rarity: newWin.skin.rarity,
				case: newWin.case,
				user: {
					id: newWin.user.id,
					username: newWin.user.profile.username,
					avatarPath: newWin.user.profile.avatarPath,
				},
				origin: newWin.origin,
			})

			await this.socketService.triggerStatistics({
				increment: 1,
				stat: Stat.CONTRACT,
			})

			await this.socketService.triggerStatistics({
				increment: 1,
				stat: Stat.WIN,
			})

			return {
				id: newWin.id,
				skinId: newWin.skin.id,
				nameRu: newWin.skin.nameRu,
				nameEn: newWin.skin.nameEn,
				imagePath: newWin.skin.imagePath,
				rarity: newWin.skin.rarity,
				priceRUB: newWin.quality.priceRUB,
				priceUSD: newWin.quality.priceUSD,
				priceEUR: newWin.quality.priceEUR,
				isStatTrak: newWin.quality.isStatTrak,
			}
		})
	}
}
