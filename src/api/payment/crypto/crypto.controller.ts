import { Controller, Get } from '@nestjs/common'
import { CryptoService } from './crypto.service'

@Controller('crypto')
export class CryptoController {
	constructor(private readonly cryptoService: CryptoService) {}

	@Get('success')
	async paymentSuccess() {

	}

	@Get('failed')
	async paymentFailed() {
		
	}

	@Get('status')
	async paymentStatus() {
		
	}
}
