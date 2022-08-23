import { Injectable } from "@nestjs/common";
import { UsersInfoResponse } from "@slack/web-api";
import { RollbarLogger } from "nestjs-rollbar";
import { UserService } from "src/modules/user/user.service";
import { WorkspaceService } from "src/modules/workspace/workspace.service";
import { usersaveSuccessModal } from "src/providers/blocks/modals/userSaveSuccess-modal";
import { userSaveFailModal } from "src/providers/blocks/modals/userSaveFail-modal";

@Injectable()
export class ViewSubmissionService{
    constructor(
        private _rollbarLogger : RollbarLogger,
        private _userService : UserService,
        private _workspaceService : WorkspaceService
    ){}

    async SaveUserDetails(body,view,client,context){
        const {select_user_block,add_user_whatsapp_number_block,select_availability_channel_block} = view.state.values;
        const userId = select_user_block.select_user_action.selected_user;
        const whatsAppNumber = (add_user_whatsapp_number_block.user_whatsapp_number_action.value).split('-')[1];
        const availabilityChannel = (select_availability_channel_block.user_availability_channnel_action.selected_conversations).toString();
        try{
            const {user} =  (await client.users.info({
                token:context.botToken,
                user:userId
            })) as UsersInfoResponse
    
            const userName = user.name;

            const workspace = await this._workspaceService.find({team_id:context.teamId});

            let saveUserResponse = await this._userService.create({
                name:userName,
                unique_id:userId,
                mobile_number:whatsAppNumber,
                availability_channel_id:availabilityChannel,
                workspace_id:workspace.id
            })

            console.log(saveUserResponse);

            const view = saveUserResponse ? usersaveSuccessModal() : userSaveFailModal;
            if(saveUserResponse){
                client.views.open({
                    trigger_id:body.trigger_id,
                    view:view
                })
            }

        }catch(error){
            this._rollbarLogger.error(error);
        }
        
    }
}