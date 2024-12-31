import { PRICE_SELECT } from 'src/api/casino/selects/price/price.select'

export const QUALITY_SELECT = {
	id: true,
	skinId: true,
	wear: true,
	isStatTrak: true,
	...PRICE_SELECT,
}
