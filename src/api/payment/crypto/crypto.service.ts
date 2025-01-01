import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CryptoService {
	constructor(private readonly prisma: PrismaService) {}

	async createPayment() {
		fetch('https://api.cryptocloud.plus/v2/invoice/create', {
			method: 'POST',
			headers: await this.headers(),
		})
			.then((response) => {
				if (response.ok) {
					console.log(response.json())
					return response.json()
				} else {
					return Promise.reject('Auth error')
				}
			})
			.then((data) => {
				console.log('Success:', data)
			})
			.catch((error) => {
				console.error('Fail:', error)
			})

		return ''
	}

	async headers() {
		return new Headers({
			Authorization: `Token ${process.env.CRYPTO_TOKEN}`,
		})
	}
}
