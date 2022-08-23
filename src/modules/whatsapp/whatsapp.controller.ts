import { Body, Controller, HttpCode, Post, Req,Res,Response} from '@nestjs/common';
import { httpErrorFromResponse } from '@slack/web-api/dist/errors';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {

    constructor(
        private _whatsappService : WhatsappService
    ){}
    @Post('message')
    @HttpCode(200)
    async message(@Req() req , @Body() body){
        if(body.type === 'message.created'){
            await this._whatsappService.processMessage(body);
        }  
    }
}
