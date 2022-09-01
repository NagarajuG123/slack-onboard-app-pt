import { Controller, Get, HttpCode, Query, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WorkspaceService } from '../workspace/workspace.service';
import { Request, Response } from '@nestjs/common';
import {
  ConversationsOpenResponse,
  OauthV2AccessResponse,
  UsersInfoResponse,
} from '@slack/web-api';
import { SlackApiService } from 'src/shared/services/slackapi.service';
import { stringify } from 'querystring';
import { user } from 'slack-block-builder';
import { UserService } from '../user/user.service';
import { EmployerService } from '../employer/employer.service';

@Controller('slack')
export class SlackController {
  constructor(
    private _configService: ConfigService,
    private _workspaceService: WorkspaceService,
    private _slackApiService: SlackApiService,
    private _userService: UserService,
    private _employerService: EmployerService,
  ) {}

  @Get('install')
  @Redirect()
  @HttpCode(302)
  async install(@Request() req, @Response() res) {
    const params = {
      client_id: encodeURI(this._configService.get('slack.clientId')),
      scope: encodeURI(this._configService.get('slack.botScopes')),
      user_scope: encodeURI(this._configService.get('slack.userScopes')),
      redirect_uri: encodeURI(
        `${this._configService.get('appUrl')}/slack/oauth_redirect`,
      ),
    };
    return {
      url: `https://slack.com/oauth/v2/authorize?${stringify(params)}`,
    };
  }

  @Get('add')
  @Redirect()
  async add(@Query() query: { code: string }) {
    const data = (await this._slackApiService.oauthAccess(
      query.code,
      `${this._configService.get('appUrl')}/slack/add`,
    )) as OauthV2AccessResponse;
    if (data.ok) {
      const { access_token, authed_user, bot_user_id, team } = data;
      let workspace = await this._workspaceService.findOne({ _id: team.id });
      const UserInfoRes = (await this._slackApiService.usersInfo(
        access_token,
        authed_user.id,
      )) as UsersInfoResponse;
      let workspaceData = {
        _id: team.id,
        teamName: team.name,
        botAccessToken: access_token,
        botId: bot_user_id,
        installedBy: UserInfoRes.user.id,
      };

      let employerData = {
        _id: UserInfoRes.user.id,
        name: UserInfoRes.user.real_name,
        email: UserInfoRes.user.profile.email,
        workspace: team.id,
      };

      if (!workspace) {
        workspace = await this._workspaceService.create(workspaceData);
        let employer = await this._employerService.create(employerData);
      } else {
        let workspaceResponse = await this._workspaceService.findByIdAndUpdate(
          workspace.id,
          workspaceData,
        );
        workspace = await this._workspaceService.findOne({ _id: team.id });
        let employer = await this._employerService.findOne({
          _id: UserInfoRes.user.id,
        });
        if (!employer) {
          await this._employerService.create(employerData);
        } else {
          await this._employerService.findByIdAndUpdate(UserInfoRes.user.id, {
            employerData,
          });
        }
      }

      const conversations = (await this._slackApiService.conversationsOpen(
        workspace.botAccessToken,
        authed_user.id,
      )) as ConversationsOpenResponse;
      if (UserInfoRes.ok && conversations.ok) {
        const botConversationId = conversations.channel.id;
        this._slackApiService.postBlockMessage(
          workspace.botAccessToken,
          botConversationId,
          `Hi <@${UserInfoRes.user.id}>,Thanks for installing Onboarding Bot`,
        );
      }

      const appId = this._configService.get('slack.appId');

      return {
        url: `https://slack.com/app_redirect?app=${appId}&team=${team.id}`,
      };
    }

    return { url: `https://app.slack.com/client` };
  }
}
