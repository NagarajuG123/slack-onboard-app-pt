import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageLog } from "./message-log.entity";
import { MessageLogService } from "./message-log.service";

@Module({
    imports:[TypeOrmModule.forFeature([MessageLog])],
    providers:[MessageLogService],
    exports:[MessageLogService]
})
export class MessageLogModule{}