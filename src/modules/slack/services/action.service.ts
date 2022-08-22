import { Injectable } from "@nestjs/common";
import { addUserModal } from "src/providers/blocks/modals/addUser-modal";

@Injectable()
export class ActionService{
    constructor(){}
    async addUser(body,context,client){   
        const {trigger_id} = body;
        await client.views.open({
            trigger_id:trigger_id,
            view:addUserModal()
        })
    }
}