import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private _repository: Repository<User>;

  async create(data): Promise<User> {
    const user: any = await this._repository.insert(data);
    console.log(user);
    return user;
  }

  async find(data): Promise<User[]> {
    const user: any = await this._repository.find({
      where: data,
      order: { id: 'ASC' },
    });
    return user;
  }

  async delete(data): Promise<boolean> {
    let res;
    const response: any = await this._repository.delete(data);
    response.affected == 1 ? (res = true) : (res = false);
    return res;
  }

  async update(id, data): Promise<boolean> {
    let res;
    const response: any = await this._repository.update({ id: id }, data);
    response.affected == 1 ? (res = true) : (res = false);
    return res;
  }

  async findUserWithPagination(workspace_id, offset, limit) {
    const users: any = await this._repository.find({
      where: { workspace_id: workspace_id },
      order: { id: 'ASC' },
      skip: offset,
      take: limit,
    });
    console.log(users);
    return users;
  }
}
