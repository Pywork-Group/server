import { Module } from '@nestjs/common'
import { CryptoController } from './crypto.controller'
import { CryptoResolver } from './crypto.resolver'
import { CryptoService } from './crypto.service'

@Module({
	controllers: [CryptoController],
	providers: [CryptoResolver, CryptoService],
})
export class CryptoModule {}
