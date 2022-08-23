import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessageLog } from "./message-log.entity";

@Injectable()
export class MessageLogService{
    @InjectRepository(MessageLog)
    private _repository:Repository<MessageLog>

    async create(data):Promise<MessageLog>{
        let messageLog:any =  await this._repository.insert(data);
        return messageLog;
    }
    
}