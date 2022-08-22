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


export function usersaveSuccessModal(): any {

    const blocks = [
        Section({text: bold('User Details is saved successfully 🥳')})
	];

    return Modal({
        title: 'Success Message',
        submit: 'Submit',
        close: 'Close'
      })
      .blocks(blocks)
        .buildToJSON();
}
