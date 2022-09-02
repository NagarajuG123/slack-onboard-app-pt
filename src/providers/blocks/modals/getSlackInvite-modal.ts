import {
  bold,
  Button,
  ConversationMultiSelect,
  Divider,
  HomeTab,
  Input,
  Modal,
  OptionBuilder,
  RadioButtons,
  Section,
  StaticSelect,
  TextInput,
  UserSelect,
  Option,
} from 'slack-block-builder';
import { Action } from 'src/enums/Actions.enum';
import { Block } from 'src/enums/Blocks.enum';
import { ViewSubmission } from 'src/enums/view-submissions.enum';

export function getSlackInvite(): any {
  const blocks = [
    Input({
      label: `Enter Slack Invite Link`,
      blockId: Block.GetSlackInviteLink,
    }).element(
      TextInput({
        actionId: Action.GetSlackInviteLink,
      }).placeholder('Enter Slack Invite Link'),
    ),
  ];

  return Modal({
    title: 'Add Slack Invite link',
    submit: 'Submit',
    close: 'Close',
    callbackId: ViewSubmission.SubmitSlackInviteLink,
  })
    .blocks(blocks)
    .buildToJSON();
}
