import { Module } from '@nestjs/common';
import { SlackService } from './slack.service';
import { SlackController } from './slack.controller';
import { WorkspaceModule } from '../workspace/workspace.module';
import { SharedModule } from 'src/shared/shared.module';
import { EventService } from './services/event.service';
import { UserModule } from '../user/user.module';
import { ActionService } from './services/action.service';
import { ViewSubmissionService } from './services/viewsubmission.service';

@Module({
  imports:[WorkspaceModule,SharedModule,UserModule],
  providers: [SlackService,EventService,ActionService,ViewSubmissionService],
  controllers: [SlackController],
  exports:[SlackService,EventService,ActionService,ViewSubmissionService]
})
export class SlackModule {}
