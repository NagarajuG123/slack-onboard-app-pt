import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from './workspace.entity';

@Injectable()
export class WorkspaceService {
    @InjectRepository(Workspace)
    private _repository: Repository<Workspace>;

    async create(data): Promise<Workspace> {
        const workspace:any = await this._repository.create(data);
        return this._repository.save(workspace);
    }

    async find(data):Promise<Workspace>{
        return this._repository.findOne({where:data})
    }



    async update(id,data):Promise<Workspace> {
        let res;
        let result:any = await this._repository.update({id:id},data);
        result.affected == 1 ? res = true :  res=false
        return res;
    }   
}
