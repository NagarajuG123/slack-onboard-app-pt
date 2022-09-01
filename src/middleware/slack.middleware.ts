import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createHmac } from 'crypto';
import tsscmp from 'tsscmp';
import {ConfigModule,ConfigService} from '@nestjs/config'

@Injectable()
export class SlackMiddleware implements NestMiddleware {
    private _signingSecret: string;

    constructor(private _configService: ConfigService) {

        this._signingSecret = this._configService.get('slack.slackSigningSecret');
    }

    use(req, res: Response, next: NextFunction) {
        const headers = req.headers;
        const signature = headers['x-slack-signature'] as string;
        const timestamp = headers['x-slack-request-timestamp'];
        if (signature && timestamp) {
            const hmac = createHmac('sha256', this._signingSecret);
            const [version, hash] = signature.split('=');
            hmac.update(`${version}:${timestamp}:${req.rawBody}`);
            if (tsscmp(hash, hmac.digest('hex'))) {
                return next();
            }
        }

        return next(new NotFoundException());
    }
}
