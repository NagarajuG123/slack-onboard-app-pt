import { Injectable } from "@nestjs/common";
import { UsersInfoResponse } from "@slack/web-api";
import { RollbarLogger } from "nestjs-rollbar";
import { UserService } from "src/modules/user/user.service";
import { WorkspaceService } from "src/modules/workspace/workspace.service";
import { successMessageModal } from "src/providers/blocks/modals/success-message-modal";
import { failureMessageModal } from "src/providers/blocks/modals/failure-message-modal";
import { noViewHome } from "src/providers/blocks/Home";

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
        const whatsAppNumber = add_user_whatsapp_number_block.user_whatsapp_number_action.value;
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


            const view = saveUserResponse ? successMessageModal('User Details is saved successfully 🥳') : failureMessageModal('Unable to save User Details 😟');
            if(saveUserResponse){
                client.views.open({
                    trigger_id:body.trigger_id,
                    view:view
                })
            }

            await client.conversations.join({
                token:workspace.bot_access_token,
                channel:availabilityChannel
            })


        }catch(error){
            this._rollbarLogger.error(error);
        }
        
    }

    async updateUserDetails(body,view,client,context){
        const {private_metadata} = view;
        const {add_user_whatsapp_number_block,select_availability_channel_block} = view.state.values;
        let user = JSON.parse(private_metadata);
        const whatsAppNumber = add_user_whatsapp_number_block.user_whatsapp_number_action.value;
        const availabilityChannel = (select_availability_channel_block.user_availability_channnel_action.selected_conversations).toString();

        let updateResponse = await this._userService.update(user.id,{
            mobile_number:whatsAppNumber,
            availability_channel_id:availabilityChannel
        })

        const viewFile = updateResponse ? successMessageModal('User Details is updated successfully 🥳') : failureMessageModal('Unable to update User Details 😟');
            if(updateResponse){
                client.views.open({
                    trigger_id:body.trigger_id,
                    view:viewFile
                })
            }

    }

    async saveDefaultChannel(body,view,client,context){
        let {select_default_availability_channel_block} = view.state.values;
        //console.log(select_default_availability_channel_block)
        let defaultChannel = (select_default_availability_channel_block.select_default_availability_channel_action.selected_conversations).toString();
        defaultChannel = defaultChannel.length !== 0 ? defaultChannel : null;
        let workspace = await this._workspaceService.find({team_id:context.teamId})
        let saveDefaultChannelResponse = await this._workspaceService.update(workspace.id,{default_channel:defaultChannel});
        let viewFile = saveDefaultChannelResponse ? successMessageModal('Default channel added successfully') : failureMessageModal('Sorry! Unable to add Default Channel')
    
        client.views.open({
            trigger_id:body.trigger_id,
            view:viewFile
        })
    }

}