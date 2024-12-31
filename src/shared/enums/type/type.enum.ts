import { registerEnumType } from '@nestjs/graphql'

export enum Type {
	// Пистолеты
	GLOCK_18 = 'GLOCK_18',
	USP_S = 'USP_S',
	P2000 = 'P2000',
	DUAL_BERETTAS = 'DUAL_BERETTAS',
	P250 = 'P250',
	FIVE_SEVEN = 'FIVE_SEVEN',
	TEC_9 = 'TEC_9',
	CZ75_AUTO = 'CZ75_AUTO',
	DESERT_EAGLE = 'DESERT_EAGLE',
	R8_REVOLVER = 'R8_REVOLVER',

	// Пистолеты-пулеметы
	MP9 = 'MP9',
	MAC_10 = 'MAC_10',
	MP7 = 'MP7',
	MP5_SD = 'MP5_SD',
	UMP_45 = 'UMP_45',
	P90 = 'P90',
	PP_BIZON = 'PP_BIZON',

	// Винтовки
	FAMAS = 'FAMAS',
	GALIL_AR = 'GALIL_AR',
	M4A4 = 'M4A4',
	M4A1_S = 'M4A1_S',
	AK_47 = 'AK_47',
	AUG = 'AUG',
	SG_553 = 'SG_553',

	// Снайперские винтовки
	AWP = 'AWP',
	SSG_08 = 'SSG_08',
	SCAR_20 = 'SCAR_20',
	G3SG1 = 'G3SG1',

	// Пулеметы
	M249 = 'M249',
	NEGEV = 'NEGEV',

	// Дробовики
	MAG_7 = 'MAG_7',
	SAWED_OFF = 'SAWED_OFF',
	NOVA = 'NOVA',
	XM1014 = 'XM1014',

	// Ножи
	KNIFE = 'KNIFE',

	// Перчатки
	GLOVES = 'GLOVES',

	// Наклейки
	STICKER = 'STICKER',
}

registerEnumType(Type, {
	name: 'Type',
})
