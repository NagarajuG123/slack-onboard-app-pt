import { Controller, Get, HttpCode, Query, Redirect } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WorkspaceService } from '../workspace/workspace.service';
import { Request,Response } from '@nestjs/common';
import { ConversationsOpenResponse, OauthV2AccessResponse, UsersInfoResponse } from '@slack/web-api';
import { SlackApiService } from 'src/shared/services/slackapi.service';
import { stringify } from 'querystring';
import { UpdateDateColumn } from 'typeorm';

@Controller('slack')
export class SlackController {
    constructor(
        private _configService : ConfigService,
        private _workspaceService : WorkspaceService,
        private _slackApiService : SlackApiService
    ){}

    @Get('install')
    @Redirect()
    @HttpCode(302)
    async install(@Request() req, @Response() res) {
        const params = {
            client_id: encodeURI(this._configService.get('slack.clientId')),
            scope: encodeURI(this._configService.get('slack.botScopes')),
            user_scope: encodeURI(this._configService.get('slack.userScopes')),
            redirect_uri: encodeURI(`${this._configService.get('appUrl')}/slack/oauth_redirect`),
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
            let workspace = await this._workspaceService.find({team_id:team.id});
            let workspaceData = {
                team_id: team.id,
                name: team.name,
                bot_access_token: access_token,
                bot_id: bot_user_id
            }
    
            if (!workspace) {
                workspace = await this._workspaceService.create(workspaceData);
            }else{
                workspace = await this._workspaceService.update(workspaceData)
            }
                const usersInfo = (await this._slackApiService.usersInfo(
                    workspace.bot_access_token,
                    authed_user.id,
                )) as UsersInfoResponse;
                const conversations =
                    (await this._slackApiService.conversationsOpen(
                        workspace.bot_access_token,
                        authed_user.id,
                    )) as ConversationsOpenResponse;
                if (usersInfo.ok && conversations.ok) {
                    const botConversationId = conversations.channel.id;
                    this._slackApiService.postBlockMessage(
                        workspace.bot_access_token,
                        botConversationId,
                        `Hi <@${usersInfo.user.id}>,Thanks for installing availability Bot`,
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
