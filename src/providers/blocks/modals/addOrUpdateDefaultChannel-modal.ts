import {
    bold,
    ConversationMultiSelect,
    Input,
    Modal,
    Section,
    TextInput,
    UserSelect,
} from 'slack-block-builder';
import { Action } from 'src/enums/Actions.enum';
import { Block } from 'src/enums/Blocks.enum';
import { ViewSubmission } from 'src/enums/view-submissions.enum';


export function addDefaultChannel(default_channel): any {

    const blocks = [
        Section({text: bold('Select Default Availability Channel'),blockId:Block.SelectDefaultAvailabilityChannel})
        .accessory(
            ConversationMultiSelect({placeholder:'Select Default Availability Channel'})
            .actionId(Action.SelectDefaultAvailabilityChannel)
            .excludeBotUsers()
            .excludeExternalSharedChannels()
            .filter('private','public')
            .maxSelectedItems(1)
            .initialConversations(default_channel)
        )
	];

    return Modal({
        title: 'Choose Default channel',
        submit: 'Submit',
        close: 'Close',
        callbackId: ViewSubmission.SubmitDefaultAvailabilityChannel,
      })
      .blocks(blocks)
        .buildToJSON();
}
