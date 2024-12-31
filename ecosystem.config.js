module.exports = {
	apps: [
		{
			name: 'KUPIDROP-SERVER',
			script: 'yarn',
			args: 'start',
			watch: true,
			ignore_watch: ['node_modules', 'logs',],
			env: {
				NODE_ENV: 'production',
				PORT: '4200',
				DOMAIN: 'kupidrop.ru',
				NEXT_APP_URL: 'https://kupidrop.ru',
				NEST_APP_URL: 'https://server.kupidrop.ru',
				DATABASE_URL:
					'postgresql://postgres:koribla1@localhost:5432/Kupidrop?schema=public',
				ACCESS_TOKEN_JWT_SECRET: '&AD1SF56QWGQWFVQW',
				REFRESH_TOKEN_JWT_SECRET: '89024YT09JFVQ09',
				ACCESS_TOKEN_EXPIRE_MINUTES: '1',
				REFRESH_TOKEN_EXPIRE_DAYS: '1',
				STEAM_TOKEN: '51209E756F31431C1F089A3D5090BFAA',
				TELEGRAM_ID: '7551896053',
				TELEGRAM_TOKEN: '8076967073:AAEby4ZuulKPbHFEMXyNp1BG59JSuPYPgFQ',
			},
		},
	],
}
