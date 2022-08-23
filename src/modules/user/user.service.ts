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
    }

    async find(data): Promise<User[]>{
        const user:any = await this._repository.find({where:data})
        return user;
    }
}
