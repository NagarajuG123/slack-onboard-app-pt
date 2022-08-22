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


export function addUserModal(): any {

    const blocks = [
			
        Input({label:'Select User'})
        .element(
            UserSelect({
                placeholder:'Select User',    
            })
            .actionId(Action.SelectUser)
        )
        .blockId(Block.SelectUser),
        Input({
            label:`Enter User's WhatsApp number`,
            blockId:Block.AddWhatsAppNumber,
        })
        .element(
            TextInput({
                actionId:Action.AddWhatsAppNumber,
            })
            .maxLength(14)
            .minLength(14)
            .initialValue('+91-')
            .placeholder('Enter WhatsApp number(Ex:8241523000)')            
        ),
        Section({text: bold('Select Availability Channel'),blockId:Block.SelectAvailabilityChannel})
        .accessory(
            ConversationMultiSelect({placeholder:'Select User Availability Channel'})
            .actionId(Action.SelectAvailabilityChannel)
            .excludeBotUsers()
            .filter('private','public')
            .maxSelectedItems(1)
        )
	];

    return Modal({
        title: 'Add User Details',
        submit: 'Submit',
        close: 'Close',
        callbackId: ViewSubmission.SubmitUserDetails,
      })
      .blocks(blocks)
        .buildToJSON();
}
