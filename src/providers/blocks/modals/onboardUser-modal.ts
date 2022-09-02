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

export function onboardUser(userRoles): any {
  let options = [
    Option({
      text: 'Candidate',
      value: 'Candidate',
    }),
    Option({
      text: 'Intern',
      value: 'Intern',
    }),
    Option({
      text: 'Employee',
      value: 'Employee',
    }),
    Option({
      text: 'Vendor',
      value: 'Vendor',
    }),
  ];
  const blocks = [
    Input({
      label: `Enter Name`,
      blockId: Block.AddUserName,
    }).element(
      TextInput({
        actionId: Action.AddUserName,
      }).placeholder('Enter Name'),
    ),
    Input({
      label: `Enter email address`,
      blockId: Block.AddUserEmailAddress,
    }).element(
      TextInput({
        actionId: Action.AddUserEmailAddress,
      }).placeholder('Enter Email Address'),
    ),
    Input({
      label: `Enter Mobile Number`,
      blockId: Block.AddUserMobileNumber,
    }).element(
      TextInput({
        actionId: Action.AddUserMobileNumber,
      }).placeholder('Ex:8241523000'),
    ),
    Section({
      text: bold('Select User Role'),
      blockId: Block.SelectUserRole,
    }).accessory(
      StaticSelect().actionId(Action.SelectUserRole).options(options),
    ),
  ];

  return Modal({
    title: 'User Onboard Form',
    submit: 'Submit',
    close: 'Close',
    callbackId: ViewSubmission.SubmitOnboardForm,
  })
    .blocks(blocks)
    .buildToJSON();
}
