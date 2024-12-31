import { Injectable } from '@nestjs/common'
import { SKIN_ERROR } from 'src/errors/skin/skin.error'
import { PrismaService } from 'src/prisma/prisma.service'
import { CASE_SELECT } from '../case/selects/case/case.select'
import { CURRENT_SKIN_SELECT } from './selects/current-skin/current-skin.select'
import { SKIN_SELECT } from './selects/skin/skin.select'

@Injectable()
export class SkinService {
	constructor(private readonly prisma: PrismaService) {}

	async getCurrentSkin(id: number) {
		const skin = await this.prisma.skin.findUnique({
			where: { id },
			select: {
				...CURRENT_SKIN_SELECT,
				cases: {
					where: { isHidden: false },
					orderBy: [
						{ priceRUB: 'asc' },
						{ priceUSD: 'asc' },
						{ priceEUR: 'asc' },
					],
					select: CASE_SELECT,
				},
			},
		})

		if (!skin) {
			return SKIN_ERROR.NOT_FOUND()
		}

		const similarSkins = await this.prisma.skin.findMany({
			where: {
				id: { not: id },
				rarity: skin.rarity,
				isHidden: false,
			},
			select: SKIN_SELECT,
		})

		const qualities = skin.qualities.reduce(
			(acc, { wear, isStatTrak, priceRUB, priceUSD, priceEUR }) => {
				const existing = acc.find((item) => item.wear === wear)

				if (existing) {
					if (isStatTrak) {
						existing.statTrakPriceRUB = priceRUB
						existing.statTrakPriceUSD = priceUSD
						existing.statTrakPriceEUR = priceEUR
					}
				} else {
					acc.push({
						wear,
						priceRUB,
						priceUSD,
						priceEUR,
						...(isStatTrak
							? {
									statTrakPriceRUB: priceRUB,
									statTrakPriceUSD: priceUSD,
									statTrakPriceEUR: priceEUR,
							  }
							: {}),
					})
				}

				return acc
			},
			[]
		)

		const { qualities: _, ...rest } = skin

		return {
			...rest,
			qualities,
			similarSkins,
		}
	}
}
