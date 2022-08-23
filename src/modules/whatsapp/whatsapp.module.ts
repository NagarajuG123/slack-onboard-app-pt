import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageLog } from '../message-log/message-log.entity';
import { MessageLogModule } from '../message-log/message-log.module';
import { UserModule } from '../user/user.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports:[MessageLogModule,UserModule,SharedModule,WorkspaceModule],
  providers: [WhatsappService],
  controllers: [WhatsappController],
  exports:[WhatsappService]
})
export class WhatsappModule {}
