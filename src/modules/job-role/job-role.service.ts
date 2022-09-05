import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobRole } from './job-role.schema';

@Injectable()
export class JobRoleService {
  constructor(
    @InjectModel('JobRole')
    private _jobRoleModel: Model<JobRole>,
  ) {}

  async findOne(query): Promise<JobRole> {
    return this._jobRoleModel.findOne(query);
  }

  async findall(query): Promise<JobRole[]> {
    return this._jobRoleModel.find(query);
  }
  async create(query): Promise<JobRole> {
    return this._jobRoleModel.create(query);
  }

  //   async findByIdAndUpdate(
  //     id: string,
  //     set?: { installedBy } | { botAccessToken } | { slackInvite },
  //   ): Promise<JobRole> {
  //     return this._jobRoleModel.findByIdAndUpdate(id, {
  //       $set: set,
  //     });
  //   }
}
