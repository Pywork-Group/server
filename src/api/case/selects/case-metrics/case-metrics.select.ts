import { METRICS_SELECT } from 'src/api/casino/selects/metrics/metrics.select'
import { PRICE_SELECT } from 'src/api/casino/selects/price/price.select'

export const CASE_METRICS_SELECT = {
	id: true,
	metrics: {
		select: METRICS_SELECT,
	},
	...PRICE_SELECT,
}
