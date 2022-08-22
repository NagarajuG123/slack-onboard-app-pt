import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ExpressReceiver } from '@slack/bolt';
import { RollbarLogger } from 'nestjs-rollbar';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/all.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const receiver = new ExpressReceiver({ 
    signingSecret: app.get(ConfigService).get('slack.signingSecret'),
    endpoints: { events: '/slack/events', interactive: '/slack/interactive' , commands: '/slack/command' ,install:'/slack/add'},
  });

  const httpAdapter = app.get(HttpAdapterHost);

  const rollbarLogger = app.get(RollbarLogger);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, rollbarLogger));
  
  const appModule = app.get(AppModule);
  appModule.initSlack(receiver);
  app.use(receiver.router);
  await app.listen(parseInt(app.get(ConfigService).get('port')));
}
bootstrap();
