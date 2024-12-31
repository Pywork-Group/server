import { NotFoundException } from '@nestjs/common'
import { EnumLanguage } from 'src/shared/enums/language/language.enum'

export const CASE_ERROR = {
	NOT_FOUND: () => {
		throw new NotFoundException({
			[EnumLanguage.RU]: 'Кейс не найден.',
			[EnumLanguage.EN]: 'Case not found.',
			[EnumLanguage.PT]: 'Caso não encontrado.',
			[EnumLanguage.PL]: 'Nie znaleziono sprawy.',
			[EnumLanguage.SE]: 'Fallet hittades inte.',
			[EnumLanguage.DE]: 'Fall nicht gefunden.',
			[EnumLanguage.ES]: 'Caso no encontrado.',
			[EnumLanguage.FR]: 'Cas non trouvé.',
			[EnumLanguage.TR]: 'Vaka bulunamadı.',
		})
	},
}
