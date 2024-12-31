import {
	OLD_PRICE_SELECT,
	PRICE_SELECT,
} from 'src/api/casino/selects/price/price.select'

export const CASE_SELECT = {
	nameRu: true,
	nameEn: true,
	slug: true,
	imagePath: true,
	...OLD_PRICE_SELECT,
	...PRICE_SELECT,
}