import { CASE_INFO_SELECT } from 'src/api/case/selects/case-info/case-info.select'
import { QUALITY_SELECT } from 'src/api/skin/selects/quality/quality.select'
import { SKIN_SELECT } from 'src/api/skin/selects/skin/skin.select'
import { USER_SELECT } from 'src/api/user/selects/user/user.select'

export const WIN_SELECT = {
	id: true,
	quality: {
		select: QUALITY_SELECT,
	},
	skin: {
		select: SKIN_SELECT,
	},
	case: {
		select: CASE_INFO_SELECT,
	},
	user: {
		select: USER_SELECT,
	},
	origin: true,
	status: true,
}
