import { Module } from '@nestjs/common'
import { TelegramService } from 'src/api/telegram/telegram.service'
import { WinResolver } from './win.resolver'
import { WinService } from './win.service'

@Module({
	providers: [WinResolver, WinService, TelegramService],
})
export class WinModule {}
