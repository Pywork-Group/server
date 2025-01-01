import { Injectable } from '@nestjs/common'
import { TelegramService } from 'src/api/telegram/telegram.service'
import { STEAM_ROUTE } from 'src/constants/route/route.constants'
import { USER_ERROR } from 'src/errors/user/user.error'
import { WIN_ERROR } from 'src/errors/win/win.error'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { Status } from 'src/shared/enums/status/status.enum'
import { formatSkinName } from 'src/utils/formats/skin-name/format-skin-name.util'
import { fieldCurrency } from 'src/utils/helpers/currency/field-currency.util'
import { PRICE_SELECT } from '../casino/selects/price/price.select'
import { UserService } from '../user/user.service'
import { WinsQueryInput } from './input/query.input'
import { WIN_SELECT } from './select/win.select'

@Injectable()
export class WinService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService,
		private readonly userService: UserService,
		private readonly telegramService: TelegramService
	) {}

	async getWins(input: WinsQueryInput, authId?: number) {
		const userId = authId || input.userId

		if (input.isUserRequired && !userId) {
			return {
				wins: [],
				count: 0,
			}
		}

		const { perPage, skip } = this.paginationService.getPagination({
			page: input.page,
			perPage: input.perPage,
		})

		const filters = {
			where: {
				...(userId && {
					userId: input.isNotUser ? { not: userId } : userId,
				}),
				...(input.status && {
					status: input.status,
				}),
			},
		}

		const wins = await this.prisma.win.findMany({
			...filters,
			select: WIN_SELECT,
			skip,
			take: perPage,
			orderBy: {
				createdAt: 'desc',
			},
		})

		const count = !input.isNotUser ? await this.prisma.win.count(filters) : 0

		const formattedWins = wins.map((win) => ({
			id: win.id,
			skinId: win.skin.id,
			nameRu: input.isNotUser
				? formatSkinName(win.skin.nameRu)
				: win.skin.nameRu,
			nameEn: input.isNotUser
				? formatSkinName(win.skin.nameEn)
				: win.skin.nameEn,
			imagePath: win.skin.imagePath,
			rarity: win.skin.rarity,
			wear: win.quality.wear,
			case: win.case,
			priceRUB: win.quality.priceRUB,
			priceUSD: win.quality.priceUSD,
			priceEUR: win.quality.priceEUR,
			user: {
				id: win.user.id,
				username: win.user.profile.username,
				avatarPath: win.user.profile.avatarPath,
			},
			status: win.status,
			origin: win.origin,
			isStatTrak: win.quality.isStatTrak,
		}))

		return {
			wins: formattedWins,
			count,
		}
	}

	async sellWins(userId: number, items: number[]) {
		const transaction = await this.prisma.$transaction(async (prisma) => {
			try {
				const updateResult = await prisma.win.updateMany({
					where: { id: { in: items } },
					data: { status: Status.SOLD },
				})

				if (updateResult.count === 0) return []

				const wins = await prisma.win.findMany({
					where: { id: { in: items } },
					select: {
						quality: {
							select: PRICE_SELECT,
						},
					},
				})

				const { currency } = await prisma.user.findUnique({
					where: { id: userId },
					select: { currency: true },
				})

				const totalSum = wins.reduce((total, win) => {
					return total + Number(win.quality[fieldCurrency('price', currency)])
				}, 0)

				await this.userService.updateBalance(userId, totalSum, 'increment')

				return items
			} catch (error) {
				console.error('Error during sellWins transaction:', error)
				return []
			}
		})

		return transaction
	}

	async sellAllWins(userId: number) {
		const transaction = await this.prisma.$transaction(async (prisma) => {
			const wins = await prisma.win.findMany({
				where: { userId, status: Status.WON },
				select: {
					quality: {
						select: PRICE_SELECT,
					},
				},
			})

			if (wins.length === 0) return WIN_ERROR.SELL_AVAILABLE()

			await prisma.win.updateMany({
				where: { userId, status: Status.WON },
				data: { status: Status.SOLD },
			})

			const { currency } = await prisma.user.findUnique({
				where: { id: userId },
				select: { currency: true },
			})

			const totalSum = wins.reduce((total, win) => {
				return total + Number(win.quality[fieldCurrency('price', currency)])
			}, 0)

			await this.userService.updateBalance(userId, totalSum, 'increment')

			return totalSum
		})

		return transaction
	}

	// TODO: CHANGE TO ANOTHER LANGUAGE
	async requestWin(id: number, userId: number) {
		const transaction = await this.prisma.$transaction(async (prisma) => {
			const user = await prisma.user.findUnique({
				where: { id: userId },
				select: {
					steamId: true,
					profile: {
						select: {
							tradeLink: true,
						},
					},
				},
			})

			if (!user.profile.tradeLink) return USER_ERROR.TRADE_NOT_FOUND()

			const requestedWin = await prisma.win.findUnique({
				where: { id },
				select: {
					status: true,
					skin: { select: { imagePath: true, nameRu: true } },
					quality: true,
				},
			})

			if (requestedWin.status !== Status.WON)
				return WIN_ERROR.REQUEST_AVAILABLE()

			const {
				id: winId,
				skin,
				quality,
			} = await prisma.win.update({
				where: { id },
				data: { status: Status.REQUESTED },
				select: WIN_SELECT,
			})

			const message = `
<b>ID:</b> ${winId}
<b>Вывод скина:</b> ${quality.isStatTrak ? 'StatTrak™ ' : ''}${skin.nameRu}
<b>Качество:</b> ${quality.wear}
<b>Цена (RUB):</b> ${quality.priceRUB} ₽
<b>Цена (USD):</b> ${quality.priceUSD} $
<b>Цена (EUR):</b> ${quality.priceEUR} €
`

			await this.telegramService.sendMessage(message, skin.imagePath, [
				{
					url: STEAM_ROUTE.PROFILE(user.steamId),
					text: 'Посмотреть профиль',
				},
			])

			return winId
		})

		return transaction
	}
}
