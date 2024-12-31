import { Module } from '@nestjs/common'
import { SocketModule } from '../socket/socket.module'
import { CasinoResolver } from './casino.resolver'
import { CasinoService } from './casino.service'

@Module({
	imports: [SocketModule],
	providers: [CasinoResolver, CasinoService],
})
export class CasinoModule {}
