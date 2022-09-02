import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, name: string, slackInvite: string) {
    console.log(email);
    await this.mailerService.sendMail({
      to: email,
      from: 'vvisagalakshmi@gmail.com',
      subject: 'PearlThoughts | Onboard Mail',
      template: 'email',
      context: {
        name: name,
        slackInvite: slackInvite,
      },
    });
  }
}
