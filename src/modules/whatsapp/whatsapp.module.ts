import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { MessageLogModule } from '../message-log/message-log.module';
import { UserModule } from '../user/user.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { SharedModule } from 'src/shared/shared.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MessageLogModule, UserModule, SharedModule, WorkspaceModule],
  providers: [WhatsappService],
  controllers: [WhatsappController],
  exports: [WhatsappService],
})
export class WhatsappModule {
  constructor() {}
}
