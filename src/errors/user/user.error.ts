import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { EnumLanguage } from 'src/shared/enums/language/language.enum'

export const USER_ERROR = {
	NOT_FOUND: () => {
		throw new NotFoundException({
			[EnumLanguage.RU]: 'Пользователь не найден.',
			[EnumLanguage.EN]: 'User not found.',
			[EnumLanguage.PT]: 'Usuário não encontrado.',
			[EnumLanguage.PL]: 'Użytkownik nie znaleziony.',
			[EnumLanguage.SE]: 'Användaren hittades inte.',
			[EnumLanguage.DE]: 'Benutzer nicht gefunden.',
			[EnumLanguage.ES]: 'Usuario no encontrado.',
			[EnumLanguage.FR]: 'Utilisateur non trouvé.',
			[EnumLanguage.TR]: 'Kullanıcı bulunamadı.',
		})
	},
	NOT_ENOUGH_BALANCE: () => {
		throw new ForbiddenException({
			[EnumLanguage.RU]: 'Не хватает средств. Пополните баланс.',
			[EnumLanguage.EN]: 'Not enough funds. Please top up your balance.',
			[EnumLanguage.PT]: 'Saldo insuficiente. Por favor, adicione fundos.',
			[EnumLanguage.PL]:
				'Brak wystarczających środków. Proszę doładować konto.',
			[EnumLanguage.SE]:
				'Inte tillräckligt med pengar. Vänligen fyll på ditt saldo.',
			[EnumLanguage.DE]: 'Nicht genug Guthaben. Bitte laden Sie Ihr Konto auf.',
			[EnumLanguage.ES]: 'Fondos insuficientes. Por favor, recargue su saldo.',
			[EnumLanguage.FR]: 'Fonds insuffisants. Veuillez recharger votre solde.',
			[EnumLanguage.TR]: 'Yetersiz bakiye. Lütfen bakiyenizi doldurun.',
		})
	},
	TRADE_NOT_FOUND: () => {
		throw new NotFoundException({
			[EnumLanguage.RU]:
				'Трейд-ссылка не найдена. Пожалуйста, сначала укажите трейд-ссылку.',
			[EnumLanguage.EN]:
				'Trade link not found. Please provide a trade link first.',
			[EnumLanguage.PT]:
				'Link de troca não encontrado. Por favor, forneça o link de troca primeiro.',
			[EnumLanguage.PL]:
				'Link wymiany nie znaleziony. Proszę najpierw podać link do wymiany.',
			[EnumLanguage.SE]:
				'Handelslänk inte hittad. Vänligen ange handelslänken först.',
			[EnumLanguage.DE]:
				'Handelslink nicht gefunden. Bitte geben Sie zuerst den Handelslink an.',
			[EnumLanguage.ES]:
				'Enlace de intercambio no encontrado. Por favor, proporcione primero el enlace de intercambio.',
			[EnumLanguage.FR]:
				"Lien d'échange non trouvé. Veuillez d'abord fournir le lien d'échange.",
			[EnumLanguage.TR]:
				'Takas bağlantısı bulunamadı. Lütfen önce takas bağlantısını sağlayın.',
		})
	},
	TRADE_NOT_VALID: () => {
		throw new ForbiddenException({
			[EnumLanguage.RU]: 'Неверный формат трейд-ссылки.',
			[EnumLanguage.EN]: 'Invalid trade link format.',
			[EnumLanguage.PT]: 'Formato de link de troca inválido.',
			[EnumLanguage.PL]: 'Nieprawidłowy format linku wymiany.',
			[EnumLanguage.SE]: 'Ogiltigt handelslänkformat.',
			[EnumLanguage.DE]: 'Ungültiges Handelslink-Format.',
			[EnumLanguage.ES]: 'Formato de enlace de intercambio no válido.',
			[EnumLanguage.FR]: "Format de lien d'échange invalide.",
			[EnumLanguage.TR]: 'Geçersiz takas bağlantısı formatı.',
		})
	},
	TRADE_NOT_BELONG: () => {
		throw new ForbiddenException({
			[EnumLanguage.RU]: 'Трейд-ссылка не принадлежит вашему аккаунту.',
			[EnumLanguage.EN]: 'The trade link does not belong to your account.',
			[EnumLanguage.PT]: 'O link de troca não pertence à sua conta.',
			[EnumLanguage.PL]: 'Link wymiany nie należy do twojego konta.',
			[EnumLanguage.SE]: 'Handelslänken tillhör inte ditt konto.',
			[EnumLanguage.DE]: 'Das Handelslink gehört nicht zu Ihrem Konto.',
			[EnumLanguage.ES]: 'El enlace de intercambio no pertenece a tu cuenta.',
			[EnumLanguage.FR]: "Le lien d'échange n'appartient pas à votre compte.",
			[EnumLanguage.TR]: 'Takas bağlantısı hesabınıza ait değil.',
		})
	},
}
