import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobRoleSchema } from './job-role.schema';
import { JobRoleService } from './job-role.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'JobRole',
        schema: JobRoleSchema,
        collection: 'JobRole',
      },
    ]),
  ],
  providers: [JobRoleService],
  exports: [JobRoleService],
})
export class JobRoleModule {}
