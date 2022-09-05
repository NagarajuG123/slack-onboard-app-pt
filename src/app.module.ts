import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SlackModule } from './modules/slack/slack.module';
import environment from './environments/environment';
import { LoggerModule } from 'nestjs-rollbar';
import { App, ExpressReceiver } from '@slack/bolt';
import { WorkspaceService } from './modules/workspace/workspace.service';
import { SlackService } from './modules/slack/slack.service';
import { SharedModule } from './shared/shared.module';
import { SlackController } from './modules/slack/slack.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployerModule } from './modules/employer/employer.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailModule } from './modules/mail/mail.module';
import { JobRoleService } from './modules/job-role/job-role.service';
import { JobRoleModule } from './modules/job-role/job-role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environment],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongoUri'),
      }),
      inject: [ConfigService],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        accessToken: configService.get('rollbar.accessToken'),
        captureUncaught: true,
        captureUnhandledRejections: true,
        ignoreDuplicateErrors: false,
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('mail.host'),
          secure: false,
          auth: {
            user: config.get('mail.user'),
            pass: config.get('mail.password'),
          },
        },
        defaults: {
          from: config.get('mail.fromEmail'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    EmployerModule,
    WorkspaceModule,
    SlackModule,
    SharedModule,
    MailModule,
    JobRoleModule,
  ],
  controllers: [AppController, SlackController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private _configService: ConfigService,
    private _workspaceService: WorkspaceService,
    private _slackService: SlackService,
  ) {}

  initSlackEvents(receiver: ExpressReceiver) {
    const boltApp = new App({
      signingSecret: this._configService.get('slack.signingSecret'),
      clientId: this._configService.get('slack.clientId'),
      clientSecret: this._configService.get('slack.clientSecret'),
      scopes: '',
      authorize: async ({ teamId, enterpriseId }) => {
        let data = await this._workspaceService.findOne({ _id: teamId });
        return {
          botToken: data.botAccessToken,
          botId: data.botId,
        };
      },
      receiver,
      installerOptions: {
        redirectUriPath: '/slack/add',
      },
    });
    this._slackService.initSlackEvent(boltApp);
    this._slackService.initSlackCommand(boltApp);
    this._slackService.initSlackAction(boltApp);
    this._slackService.initSlackViewSubmission(boltApp);
  }
}
