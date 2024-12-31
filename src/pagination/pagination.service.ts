import { Injectable } from '@nestjs/common'
import type { PaginationInput } from './input/pagination.input'

@Injectable()
export class PaginationService {
	getPagination({ page, perPage }: PaginationInput) {
		const skip = (page - 1) * (perPage === -1 ? 1 : perPage)

		return { perPage, skip }
	}
}
