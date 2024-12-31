import { QUALITY_SELECT } from '../quality/quality.select'
import { SKIN_SELECT } from '../skin/skin.select'

export const CASE_SKIN_SELECT = {
	...SKIN_SELECT,
	qualities: {
		select: QUALITY_SELECT,
	},
}
