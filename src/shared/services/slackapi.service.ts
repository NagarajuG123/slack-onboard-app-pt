import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebClient, WebAPICallResult, ErrorCode, Block } from '@slack/web-api';
import { RollbarLogger } from 'nestjs-rollbar';

@Injectable()
export class SlackApiService {
    private _clientId: string;
    private _clientSecret: string;
    private _webClient: WebClient;

    constructor(
        private _configService: ConfigService,
        private _rollbarLogger: RollbarLogger
    ) {
        this._webClient = new WebClient();
        this._clientId = this._configService.get('slack.clientId');
        this._clientSecret = this._configService.get('slack.clientSecret');
    }

    async postBlockMessage(
        token: string,
        channel: string,
        text: string,
        blocks?: Block[],
    ): Promise<WebAPICallResult> {

        console.log(blocks);
        const data = { token, channel, text, blocks, unfurl_links: false };
        let response;
        try {
            response = await this._webClient.chat.postMessage(data);
        } catch (error) {
            if (error.code === ErrorCode.PlatformError) {
                response = error.data;
                this._rollbarLogger.error(
                    `${this.constructor.name} - postBlockMessage`,
                    JSON.stringify({ channel, text, blocks }),
                    error,
                );
            } else {
                throw new Error(error);
            }
        }

        return response;
    }

    async postEphemeralMessage(
        token: string,
        channel: string,
        text: string,
        user: string,
    ): Promise<WebAPICallResult> {
        const data = { token, channel, text, user };
        let response;
        try {
            response = await this._webClient.chat.postEphemeral(data);
        } catch (error) {
            if (error.code === ErrorCode.PlatformError) {
                response = error.data;
                this._rollbarLogger.error(
                    `${this.constructor.name} - postEphemeralMessage`,
                    JSON.stringify({ channel, text, user }),
                    error,
                );
            } else {
                throw new Error(error);
            }
        }

        return response;
    }

    async getPermalink(
        token: string,
        channel: string,
        ts: string,
    ): Promise<WebAPICallResult> {
        const data = { token, channel, message_ts: ts };
        let response;
        try {
            response = await this._webClient.chat.getPermalink(data);
        } catch (error) {
            if (error.code === ErrorCode.PlatformError) {
                response = error.data;
                this._rollbarLogger.error(
                    `${this.constructor.name} - getPermalink`,
                    JSON.stringify({ channel, ts }),
                    error,
                );
            } else {
                throw new Error(error);
            }
        }

        return response;
    }

    async conversationsOpen(
        token: string,
        users: string,
    ): Promise<WebAPICallResult> {
        const data = { token, users };
        let response;
        try {
            response = await this._webClient.conversations.open(data);
        } catch (error) {
            if (error.code === ErrorCode.PlatformError) {
                response = error.data;
                this._rollbarLogger.error(
                    `${this.constructor.name} - conversationsOpen`,
                    JSON.stringify({ users }),
                    error,
                );
            } else {
                throw new Error(error);
            }
        }

        return response;
    }

    async conversationsMembers(
        token: string,
        channel: string,
    ): Promise<WebAPICallResult> {
        const data = { token, channel };
        let response;
        try {
            response = await this._webClient.conversations.members(data);
        } catch (error) {
            if (error.code === ErrorCode.PlatformError) {
                response = error.data;
                this._rollbarLogger.error(
                    `${this.constructor.name} - conversationsMembers`,
                    JSON.stringify({ channel }),
                    error,
                );
            } else {
                throw new Error(error);
            }
        }

        return response;
    }

    async usersInfo(token: string, user: string): Promise<WebAPICallResult> {
        const data = { token, user };
        let response;
        try {
            response = await this._webClient.users.info(data);
        } catch (error) {
            if (error.code === ErrorCode.PlatformError) {
                response = error.data;
                this._rollbarLogger.error(
                    `${this.constructor.name} - usersInfo`,
                    JSON.stringify({ user }),
                    error,
                );
            } else {
                throw new Error(error);
            }
        }

        return response;
    }

    async teamInfo(token: string, team: string): Promise<WebAPICallResult> {
        const data = { token, team };
        let response;
        try {
            response = await this._webClient.team.info(data);
        } catch (error) {
            if (error.code === ErrorCode.PlatformError) {
                response = error.data;
                this._rollbarLogger.error(
                    `${this.constructor.name} - teamInfo`,
                    JSON.stringify({ team }),
                    error,
                );
            } else {
                throw new Error(error);
            }
        }

        return response;
    }

    async oauthAccess(
        code: string,
        redirectUri: string,
    ): Promise<WebAPICallResult> {
        const data = {
            code: code,
            client_id: this._clientId,
            client_secret: this._clientSecret,
            redirect_uri: redirectUri,
        };
        let response;
        try {
            response = await this._webClient.oauth.v2.access(data);
        } catch (error) {
            if (error.code === ErrorCode.PlatformError) {
                response = error.data;
                this._rollbarLogger.error(
                    `${this.constructor.name} - oauthAccess`,
                    JSON.stringify({ clientId: this._clientId, redirectUri }),
                    error,
                );
            } else {
                throw new Error(error);
            }
        }

        return response;
    }
}
