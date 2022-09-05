import { MiddlewareConsumer, Module, NestMiddleware } from '@nestjs/common';
import { SlackService } from './slack.service';
import { SlackController } from './slack.controller';
import { WorkspaceModule } from '../workspace/workspace.module';
import { SharedModule } from 'src/shared/shared.module';
import { EventService } from './services/event.service';
import { UserModule } from '../user/user.module';
import { ActionService } from './services/action.service';
import { ViewSubmissionService } from './services/viewsubmission.service';
import { SlackMiddleware } from 'src/middleware/slack.middleware';
import { CommandService } from './services/command.service';
import { EmployerService } from '../employer/employer.service';
import { EmployerModule } from '../employer/employer.module';
import { MailModule } from '../mail/mail.module';
import { JobRoleModule } from '../job-role/job-role.module';
import { JobRoleService } from '../job-role/job-role.service';

@Module({
  imports: [
    WorkspaceModule,
    SharedModule,
    UserModule,
    EmployerModule,
    MailModule,
    JobRoleModule,
  ],
  providers: [
    SlackService,
    EventService,
    ActionService,
    ViewSubmissionService,
    CommandService,
  ],
  controllers: [SlackController],
  exports: [
    SlackService,
    EventService,
    ActionService,
    ViewSubmissionService,
    CommandService,
  ],
})
export class SlackModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(SlackMiddleware)
  //     .exclude('slack/add')
  //     .forRoutes(SlackController);
  // }
}
