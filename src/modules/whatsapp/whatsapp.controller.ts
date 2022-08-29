import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  Response,
  RawBodyRequest,
} from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import mbWebhookSignatureJwt = require('messagebird/lib/webhook-signature-jwt');

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private _whatsappService: WhatsappService,
    private _configService: ConfigService,
  ) {}
  @Post('message')
  @HttpCode(201)
  async message(@Req() req: RawBodyRequest<Request>, @Body() body) {
    const secret = await this._configService.get('messagebird.signingSecret');
    const verifySignature = new mbWebhookSignatureJwt.ExpressMiddlewareVerify(
      secret,
    );

    if (
      body.type === 'message.created' &&
      body.message.direction === 'received'
    ) {
      await this._whatsappService.processMessage(body);
    }
  }
}
