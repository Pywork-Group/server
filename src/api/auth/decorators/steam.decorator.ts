import { applyDecorators, UseGuards } from '@nestjs/common'
import { SteamGuard } from '../guards/steam.guard'

export const Steam = () => applyDecorators(UseGuards(SteamGuard))
