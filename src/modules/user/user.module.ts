import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobRoleModule } from '../job-role/job-role.module';
import { MailModule } from '../mail/mail.module';
import { ActionService } from '../slack/services/action.service';
import { EventService } from '../slack/services/event.service';
import { ViewSubmissionService } from '../slack/services/viewsubmission.service';
import { SlackModule } from '../slack/slack.module';
import { SlackService } from '../slack/slack.service';
import { WorkspaceModule } from '../workspace/workspace.module';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'User',
      },
    ]),
    WorkspaceModule,
    MailModule,
    JobRoleModule,
  ],
  providers: [
    UserService,
    SlackService,
    EventService,
    ActionService,
    ViewSubmissionService,
  ],
  exports: [UserService],
})
export class UserModule {}
