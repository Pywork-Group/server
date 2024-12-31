import { NotFoundException } from '@nestjs/common'
import { EnumLanguage } from 'src/shared/enums/language/language.enum'

export const WIN_ERROR = {
	SELL_AVAILABLE: () => {
		throw new NotFoundException({
			[EnumLanguage.RU]: 'У вас нет доступных предметов.',
			[EnumLanguage.EN]: 'You have no available items.',
			[EnumLanguage.PT]: 'Você não tem itens disponíveis.',
			[EnumLanguage.PL]: 'Nie masz dostępnych przedmiotów.',
			[EnumLanguage.SE]: 'Du har inga tillgängliga objekt.',
			[EnumLanguage.DE]: 'Sie haben keine verfügbaren Gegenstände.',
			[EnumLanguage.ES]: 'No tienes elementos disponibles.',
			[EnumLanguage.FR]: "Vous n'avez pas d'articles disponibles.",
			[EnumLanguage.TR]: 'Mevcut öğeniz yok.',
		})
	},
	REQUEST_AVAILABLE: () => {
		throw new NotFoundException({
			[EnumLanguage.RU]: 'Предмет не доступен для вывода.',
			[EnumLanguage.EN]: 'The item is not available for withdrawal.',
			[EnumLanguage.PT]: 'O item não está disponível para retirada.',
			[EnumLanguage.PL]: 'Przedmiot nie jest dostępny do wypłaty.',
			[EnumLanguage.SE]: 'Objektet är inte tillgängligt för uttag.',
			[EnumLanguage.DE]: 'Der Gegenstand ist nicht für den Abzug verfügbar.',
			[EnumLanguage.ES]: 'El artículo no está disponible para retiro.',
			[EnumLanguage.FR]: "L'article n'est pas disponible pour le retrait.",
			[EnumLanguage.TR]: 'Öğe çekim için mevcut değil.',
		})
	},
}
