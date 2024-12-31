import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CASE_SELECT } from '../case/selects/case/case.select'
import { CATEGORY_SELECT } from './select/category.select'

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async getCatalog() {
		return this.prisma.category.findMany({
			select: {
				...CATEGORY_SELECT,
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
	}
}
