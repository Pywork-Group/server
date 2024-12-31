import { NotFoundException } from '@nestjs/common'
import { EnumLanguage } from 'src/shared/enums/language/language.enum'

export const CASINO_ERROR_MESSAGE = {
	[EnumLanguage.RU]: 'Произошла ошибка. Пожалуйста попробуйте позже.',
	[EnumLanguage.EN]: 'An error occurred. Please try again later.',
	[EnumLanguage.PT]: 'Ocorreu um erro. Por favor, tente novamente mais tarde.',
	[EnumLanguage.PL]: 'Wystąpił błąd. Proszę spróbować ponownie później.',
	[EnumLanguage.SE]: 'Ett fel inträffade. Vänligen försök igen senare.',
	[EnumLanguage.DE]:
		'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.',
	[EnumLanguage.ES]:
		'Ocurrió un error. Por favor, inténtelo de nuevo más tarde.',
	[EnumLanguage.FR]: 'Une erreur est survenue. Veuillez réessayer plus tard.',
	[EnumLanguage.TR]: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
}

export const CASINO_ERROR = () => {
	throw new NotFoundException(CASINO_ERROR_MESSAGE)
}
