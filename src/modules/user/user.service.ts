import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    @InjectRepository(User)
    private _repository: Repository<User>;

    async create(data): Promise<User> {
        //console.log(data);
        const user:any = await this._repository.insert(data);
        console.log(user);
        return user;
        //return await this._repository.save(user);
    }
}
