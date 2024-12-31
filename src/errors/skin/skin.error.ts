import { NotFoundException } from '@nestjs/common'
import { EnumLanguage } from 'src/shared/enums/language/language.enum'

export const SKIN_ERROR = {
	NOT_FOUND: () => {
		throw new NotFoundException({
			[EnumLanguage.RU]: 'Скин не найден.',
			[EnumLanguage.EN]: 'Skin not found.',
			[EnumLanguage.PT]: 'Skin não encontrado.',
			[EnumLanguage.PL]: 'Skórka nie znaleziona.',
			[EnumLanguage.SE]: 'Hud hittades inte.',
			[EnumLanguage.DE]: 'Skin nicht gefunden.',
			[EnumLanguage.ES]: 'Skin no encontrado.',
			[EnumLanguage.FR]: 'Skin non trouvé.',
			[EnumLanguage.TR]: 'Skin bulunamadı.',
		})
	},
}
