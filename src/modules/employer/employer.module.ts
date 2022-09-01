import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionService } from '../slack/services/action.service';
import { EventService } from '../slack/services/event.service';
import { ViewSubmissionService } from '../slack/services/viewsubmission.service';
import { SlackModule } from '../slack/slack.module';
import { SlackService } from '../slack/slack.service';
import { WorkspaceModule } from '../workspace/workspace.module';
import { UserSchema } from './employer.schema';
import { EmployerService } from './employer.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Employer',
        schema: UserSchema,
        collection: 'Employer',
      },
    ]),
    WorkspaceModule,
  ],
  providers: [EmployerService],
  exports: [EmployerService],
})
export class EmployerModule {}
