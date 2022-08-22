import { Global, Module } from '@nestjs/common';
import { SlackApiService } from './services/slackapi.service';


@Global()
@Module({
  providers: [SlackApiService],
  exports: [SlackApiService]
})
export class SharedModule {}
