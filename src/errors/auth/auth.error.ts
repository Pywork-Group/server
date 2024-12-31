import { UnauthorizedException } from '@nestjs/common'
import { EnumLanguage } from 'src/shared/enums/language/language.enum'

export const AUTH_ERROR = {
	EXPIRED: () => {
		throw new UnauthorizedException({
			[EnumLanguage.RU]: 'Пожалуйста, войдите в систему.',
			[EnumLanguage.EN]: 'Please log in.',
			[EnumLanguage.PT]: 'Por favor, faça login.',
			[EnumLanguage.PL]: 'Proszę zalogować się.',
			[EnumLanguage.SE]: 'Vänligen logga in.',
			[EnumLanguage.DE]: 'Bitte loggen Sie sich ein.',
			[EnumLanguage.ES]: 'Por favor inicie sesión.',
			[EnumLanguage.FR]: 'Veuillez vous connecter.',
			[EnumLanguage.TR]: 'Lütfen giriş yapın.',
		})
	},
	NOT_ENOUGH_RIGHTS: () => {
		throw new UnauthorizedException({
			[EnumLanguage.RU]: 'У вас недостаточно прав.',
			[EnumLanguage.EN]: 'You do not have sufficient rights.',
			[EnumLanguage.PT]: 'Você não tem direitos suficientes.',
			[EnumLanguage.PL]: 'Nie masz wystarczających uprawnień.',
			[EnumLanguage.SE]: 'Du har inte tillräckliga rättigheter.',
			[EnumLanguage.DE]: 'Sie haben nicht genügend Rechte.',
			[EnumLanguage.ES]: 'No tienes suficientes derechos.',
			[EnumLanguage.FR]: 'Vous n\'avez pas suffisamment de droits.',
			[EnumLanguage.TR]: 'Yeterli yetkiniz yok.',
		})
	},
}
