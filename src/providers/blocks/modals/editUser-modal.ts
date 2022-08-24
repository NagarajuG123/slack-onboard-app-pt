import { text } from 'node:stream/consumers';
import {
    bold,
    Button,
    ConversationMultiSelect,
    Divider,
    HomeTab,
    Input,
    Modal,
    Section,
    TextInput,
    UserSelect,
} from 'slack-block-builder';
import { Action } from 'src/enums/Actions.enum';
import { Block } from 'src/enums/Blocks.enum';
import { ViewSubmission } from 'src/enums/view-submissions.enum';


export function editUserModal(user): any {

    const blocks = [
		Section()
        .text(`Username : <@${user.unique_id}>`),
        Input({
            label:`Enter User's WhatsApp number`,
            blockId:Block.AddWhatsAppNumber,
        })
        .element(
            TextInput({
                actionId:Action.AddWhatsAppNumber,
            })
            .maxLength(10)
            .minLength(10)
            .initialValue(user.mobile_number)            
        ),
        Section({text: bold('Select Availability Channel'),blockId:Block.SelectAvailabilityChannel})
        .accessory(
            ConversationMultiSelect({placeholder:'Select User Availability Channel'})
            .actionId(Action.SelectAvailabilityChannel)
            .excludeBotUsers()
            .filter('private','public')
            .maxSelectedItems(1)
            .initialConversations(user.availability_channel_id)
        )
	];

    return Modal({
        title: 'Edit User Details',
        submit: 'Submit',
        close: 'Close',
        callbackId: ViewSubmission.UpdateUserDetails,
        privateMetaData:JSON.stringify(user)
      })
      .blocks(blocks)
        .buildToJSON();
}
