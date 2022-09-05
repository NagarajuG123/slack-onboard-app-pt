import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private _configService: ConfigService,
  ) {}

  async sendMail(email: string, name: string, slackInvite: string) {
    await this.mailerService.sendMail({
      to: email,
      from: this._configService.get('mail.fromEmail'),
      subject: 'PearlThoughts | Onboard Mail',
      template: 'email',
      context: {
        name: name,
        slackInvite: slackInvite,
      },
    });
  }
}
