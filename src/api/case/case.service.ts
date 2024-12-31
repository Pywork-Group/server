import { Injectable } from '@nestjs/common'
import { CASE_ERROR } from 'src/errors/case/case.error'
import { USER_ERROR } from 'src/errors/user/user.error'
import { PrismaService } from 'src/prisma/prisma.service'
import { Stat } from 'src/shared/enums/stat/stat.enum'
import { formatSkinName } from 'src/utils/formats/skin-name/format-skin-name.util'
import { fieldCurrency } from 'src/utils/helpers/currency/field-currency.util'
import { CASE_SKIN_SELECT } from '../skin/selects/case-skin/case-skin.select'
import { SKIN_SELECT } from '../skin/selects/skin/skin.select'
import { SocketService } from '../socket/socket.service'
import { USER_INFO_SELECT } from '../user/selects/info/user-info.select'
import { WIN_SELECT } from '../win/select/win.select'
import { CASE_METRICS_SELECT } from './selects/case-metrics/case-metrics.select'
import { CASE_SELECT } from './selects/case/case.select'
import { Origin } from 'src/shared/enums/origin/origin.enum'

@Injectable()
export class CaseService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly socketService: SocketService
	) {}

	async getCurrentCase(slug: string) {
		const box = await this.prisma.case.findUnique({
			where: {
				slug,
			},
			select: {
				...CASE_SELECT,
				skins: {
					where: { isHidden: false },
					select: SKIN_SELECT,
					orderBy: { rarity: 'asc' },
				},
			},
		})

		if (!box) {
			return CASE_ERROR.NOT_FOUND()
		}

		return box
	}

	async openCase(slug: string, times: number, userId: number) {
		return await this.prisma.$transaction(async (transaction) => {
			const [caseData, userData] = await Promise.all([
				transaction.case.findUnique({
					where: { slug },
					select: {
						...CASE_METRICS_SELECT,
						skins: {
							where: { isHidden: false },
							select: CASE_SKIN_SELECT,
						},
					},
				}),
				transaction.user.findUnique({
					where: { id: userId },
					select: USER_INFO_SELECT,
				}),
			])

			if (!caseData) {
				return CASE_ERROR.NOT_FOUND()
			}

			if (!userData) {
				return USER_ERROR.NOT_FOUND()
			}

			const { id: caseId, skins, metrics } = caseData
			const { winChance, balance, currency } = userData

			const price = Number(caseData[fieldCurrency('price', currency)]) * times

			if (Number(balance) < price) {
				return USER_ERROR.NOT_ENOUGH_BALANCE()
			}

			const spent = Number(metrics[fieldCurrency('spent', currency)]) + price
			const spentWithoutProfit =
				(spent * (100 - metrics.profitPercentage)) / 100
			const profit = spent - spentWithoutProfit

			const maxPrize =
				Number(metrics[fieldCurrency('prize', currency)]) +
				(price * (100 - metrics.profitPercentage)) / 100

			const allDrops = skins
				.flatMap(({ id: skinId, qualities }) =>
					qualities.map(({ id: qualityId, ...rest }) => ({
						skinId,
						qualityId,
						price: Number(rest[fieldCurrency('price', currency)]),
					}))
				)
				.filter(({ price }) => price <= maxPrize)
				.sort((a, b) => b.price - a.price)

			const chosenDrops = []
			for (let i = 0; i < times; i++) {
				const count = Math.max(
					1,
					Math.round(allDrops.length / (winChance / 100))
				)
				const availableDrops = allDrops
					.filter(
						({ price }) =>
							chosenDrops.reduce((sum, drop) => sum + drop.price, 0) + price <=
							maxPrize
					)
					.slice(0, count)

				if (availableDrops.length > 0) {
					const randomDrop =
						availableDrops[Math.floor(Math.random() * availableDrops.length)]
					chosenDrops.push(randomDrop)
				} else {
					chosenDrops.push(allDrops[allDrops.length - 1])
				}
			}

			const rewardSum = chosenDrops.reduce((sum, drop) => sum + drop.price, 0)

			const [_, updatedMetrics] = await Promise.all([
				transaction.user.update({
					where: { id: userId },
					data: { balance: { decrement: price } },
				}),
				transaction.metrics.update({
					where: {
						caseId,
					},
					data: {
						[fieldCurrency('profit', currency)]: profit,
						[fieldCurrency('spent', currency)]: spent,
						[fieldCurrency('reward', currency)]: { increment: rewardSum },
						[fieldCurrency('prize', currency)]:
							spentWithoutProfit -
							(Number(metrics[fieldCurrency('reward', currency)]) + rewardSum),
						count: { increment: times },
					},
				}),
			])

			const wins = await Promise.all(
				chosenDrops.map((drop) =>
					transaction.win.create({
						data: {
							case: { connect: { id: caseId } },
							user: { connect: { id: userId } },
							quality: { connect: { id: drop.qualityId } },
							skin: { connect: { id: drop.skinId } },
							origin: Origin.CASE
						},
						select: WIN_SELECT,
					})
				)
			)

			await Promise.all(
				wins.map((win) =>
					this.socketService.triggerWins({
						nameRu: formatSkinName(win.skin.nameRu),
						nameEn: formatSkinName(win.skin.nameEn),
						imagePath: win.skin.imagePath,
						rarity: win.skin.rarity,
						case: win.case,
						user: {
							id: win.user.id,
							username: win.user.profile.username,
							avatarPath: win.user.profile.avatarPath,
						},
						origin: win.origin
					})
				)
			)

			await this.socketService.triggerStatistics({
				increment: times,
				stat: Stat.CASE,
			})

			await this.socketService.triggerStatistics({
				increment: times,
				stat: Stat.WIN,
			})

			return wins.map((win) =>
				Array.from({ length: 48 }, (_, index) => {
					if (index === 43) {
						return {
							nameRu: win.skin.nameRu,
							nameEn: win.skin.nameEn,
							imagePath: win.skin.imagePath,
							rarity: win.skin.rarity,
							win: {
								id: win.id,
								priceRUB: win.quality.priceRUB,
								priceUSD: win.quality.priceUSD,
								priceEUR: win.quality.priceEUR,
							},
						}
					}

					const randomSkin = skins[Math.floor(Math.random() * skins.length)]

					return {
						nameRu: randomSkin.nameRu,
						nameEn: randomSkin.nameEn,
						imagePath: randomSkin.imagePath,
						rarity: randomSkin.rarity,
					}
				})
			)
		})
	}
}
