import { PROFILE_INFO_SELECT } from '../profile/profile.select'

export const CURRENT_USER_SELECT = {
	id: true,
	balance: true,
	profile: {
		select: PROFILE_INFO_SELECT,
	},
	currency: true
}
