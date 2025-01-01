import { Mutation, Resolver } from '@nestjs/graphql'
import { CryptoService } from './crypto.service'

@Resolver()
export class CryptoResolver {
	constructor(private readonly cryptoService: CryptoService) {}

	@Mutation(() => String, { name: 'cryptoPayment' })
	async createCryptoPayment() {
		return this.cryptoService.createPayment()
	}
}
