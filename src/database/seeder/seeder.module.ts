import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import environment from 'src/environments/environment';
import { UserModule } from 'src/modules/user/user.module';
import { UserService } from 'src/modules/user/user.service';
import { WorkspaceModule } from 'src/modules/workspace/workspace.module';
import { WorkspaceService } from 'src/modules/workspace/workspace.service';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environment],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongoUri'),
      }),
      inject: [ConfigService],
    }),
    WorkspaceModule,
  ],
  providers: [Logger, SeederService],
})
export class SeederModule {}
