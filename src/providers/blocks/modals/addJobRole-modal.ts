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

export function addJobRolesModal(channelsCount?: number): any {
  // let options = [
  //   Option({
  //     text: 'User',
  //     value: 'User',
  //   }),
  //   Option({
  //     text: 'Project',
  //     value: 'Project',
  //   }),
  // ];

  // let noOfChannelsOptions = [
  //   Option({
  //     text: '1',
  //     value: '1',
  //   }),
  //   Option({
  //     text: '2',
  //     value: '2',
  //   }),
  // ];
  const blocks = [
    Input({
      label: `Enter Job Role name`,
      blockId: Block.GetJobRoleName,
    }).element(
      TextInput({
        actionId: Action.GetJobRoleName,
      }).placeholder('Ex:Devops,DEV'),
    ),
    Input({
      label: `Number of Channels to be created for this JobRole`,
      blockId: Block.GetNoofChannels,
    }).element(
      TextInput({
        actionId: Action.GetNoofChannels,
        maxLength: 2,
        minLength: 1,
      }).placeholder('Enter numbers between 1-9 Ex:2'),
    ),
    // Section({
    //   text: bold('Select Number of Channels'),
    //   blockId: Block.SelectNoofChannels,
    // }).accessory(
    //   StaticSelect()
    //     .actionId(Action.SelectNoofChannels)
    //     .options(noOfChannelsOptions),
    // ),
    // Section({
    //   text: bold('Select Channel Type'),
    //   blockId: Block.SelectChannelType,
    // }).accessory(
    //   StaticSelect().actionId(Action.SelectChannelType).options(options),
    // ),
    Input({
      label: `Enter User Channel names to be created separated by comma`,
      blockId: Block.GetUserChannelNames,
    }).element(
      TextInput({
        actionId: Action.GetUserChannelNames,
      }).placeholder('Ex:billing,availability'),
    ),
    Input({
      label: `Enter Project Channel names separated by comma \n Give &lt;ProjectName&gt; or &lt;UserName&gt; to replace with particular user's or Project's Name`,
      blockId: Block.GetProjectChannelNames,
    })
      .element(
        TextInput({
          actionId: Action.GetProjectChannelNames,
        }).placeholder(`Ex:ProjectName-UserName-support`),
      )
      .optional(true),
  ];

  // if (channelsCount) {
  //   for (let i = 1; i <= channelsCount; i++) {
  //     blocks.push(
  //       Input({
  //         label: `${i}.Enter channel name`,
  //         blockId: `${i}`,
  //       }).element(
  //         TextInput({
  //           actionId: `get_channel_name_${i}`,
  //         }).placeholder('Ex:billing,availability'),
  //       ),
  //     );
  //   }
  // }

  return Modal({
    title: 'Add Job Role',
    submit: 'Submit',
    close: 'Close',
    callbackId: ViewSubmission.SubmitJobRole,
  })
    .blocks(blocks)
    .buildToJSON();
}
