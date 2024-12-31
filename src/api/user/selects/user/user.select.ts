import { PROFILE_SELECT } from '../profile/profile.select'

export const USER_SELECT = {
	id: true,
	steamId: true,
	balance: true,
	profile: {
		select: PROFILE_SELECT,
	},
	currency: true,
}
