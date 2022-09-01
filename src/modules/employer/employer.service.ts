import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employer } from './employer.schema';

@Injectable()
export class EmployerService {
  constructor(
    @InjectModel('Employer')
    private _employerModel: Model<Employer>,
  ) {}

  async create(query): Promise<Employer> {
    return await this._employerModel.create(query);
  }

  async findOne(query): Promise<Employer> {
    return await this._employerModel.create(query);
  }

  async findByIdAndUpdate(id: string, query): Promise<Employer> {
    return await this._employerModel.findByIdAndUpdate(id, query);
  }
}
