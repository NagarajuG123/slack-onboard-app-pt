import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { typeOrmAsyncConfig } from './configs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SlackModule } from './modules/slack/slack.module';
import environment from './environments/environment';
import { LoggerModule } from 'nestjs-rollbar';
import { App } from '@slack/bolt';
import { WorkspaceService } from './modules/workspace/workspace.service';
import { SlackService } from './modules/slack/slack.service';
import { SharedModule } from './shared/shared.module';
import { SlackApiService } from './shared/services/slackapi.service';
import { UserService } from './modules/user/user.service';
import { SlackController } from './modules/slack/slack.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[environment],
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    LoggerModule.forRoot({
      accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
      environment: process.env.ROLLBAR_ENVIRONMENT,
      captureUncaught: true,
      captureUnhandledRejections: true,
      ignoreDuplicateErrors: false,
    }),
    UserModule, WorkspaceModule, SlackModule, SharedModule],
  controllers: [AppController,SlackController],
  providers: [AppService],
})
export class AppModule {

  constructor(
    private _configService : ConfigService,
    private _workspaceService : WorkspaceService,
    private _slackService : SlackService
  ){}

  initSlack(receiver: any) {
    const boltApp = new App({
      signingSecret: this._configService.get('slack.signingSecret'),
      clientId: this._configService.get('slack.clientId'),
      clientSecret: this._configService.get('slack.clientSecret'),
      scopes: "",
      authorize: async ({ teamId, enterpriseId }) => {
        let data = await this._workspaceService.findByTeamId(teamId);
        return {
            botToken: data.bot_access_token,
            botId: data.bot_id
        };
      },
      receiver,
    });
    this._slackService.initSlack(boltApp);
}
}
