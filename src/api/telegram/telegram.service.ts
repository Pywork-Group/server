import { Injectable } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import type { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram'

@Injectable()
export class TelegramService {
	async sendMessage(
		message: string,
		imagePath: string,
		keyboards: InlineKeyboardButton[]
	) {
		const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

		await bot.telegram.sendPhoto(process.env.TELEGRAM_ID, imagePath, {
			caption: message,
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: [keyboards],
			},
		})
	}
}
