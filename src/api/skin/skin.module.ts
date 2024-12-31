import { Module } from '@nestjs/common'
import { SkinResolver } from './skin.resolver'
import { SkinService } from './skin.service'

@Module({
	providers: [SkinResolver, SkinService],
})
export class SkinModule {}
