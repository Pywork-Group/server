import { Module } from '@nestjs/common'
import { SocketModule } from '../socket/socket.module'
import { CaseResolver } from './case.resolver'
import { CaseService } from './case.service'

@Module({
	imports: [SocketModule],
	providers: [CaseResolver, CaseService],
})
export class CaseModule {}
