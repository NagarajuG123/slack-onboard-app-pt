import { text } from 'node:stream/consumers';
import { bold, Modal, Section, UserMultiSelect } from 'slack-block-builder';
import { Action } from 'src/enums/Actions.enum';
import { Block } from 'src/enums/Blocks.enum';
import { ViewSubmission } from 'src/enums/view-submissions.enum';

export function addGlobalChannelMembers(globalMembers): any {
  const blocks = [
    Section({
      text: bold('Select Users'),
      blockId: Block.SelectGlobalChannelMembers,
    }).accessory(
      UserMultiSelect({ placeholder: 'Select employers' })
        .actionId(Action.SelectGlobalChannelMembers)
        .initialUsers(globalMembers),
    ),
  ];

  return Modal({
    title: 'Add/Edit Global Members',
    submit: 'Submit',
    close: 'Close',
    callbackId: ViewSubmission.SubmitGlobalChannelMembers,
  })
    .blocks(blocks)
    .buildToJSON();
}
