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

export function onboardUser(jobRoles, projectNameBlock?): any {
  let jobRolesOptions = [];
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

  if (jobRoles.length !== 0) {
    let jobRoleCount = jobRoles.length;
    for (let i = 0; i < jobRoleCount; i++) {
      jobRolesOptions.push(
        Option({
          text: jobRoles[i],
          value: jobRoles[i],
        }),
      );
    }
  }
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
    Section({
      text: bold('Select Job Role'),
      blockId: Block.SelectJobRole,
    }).accessory(
      StaticSelect().actionId(Action.SelectJobRole).options(jobRolesOptions),
    ),
  ];

  if (projectNameBlock) {
    blocks.push(
      Input({
        label: `Enter Project Name to Assign`,
        blockId: Block.GetProjectName,
      }).element(
        TextInput({
          actionId: Action.GetProjectName,
        }).placeholder('Ex:Interview-Bot'),
      ),
    );
  }

  return Modal({
    title: 'User Onboard Form',
    submit: 'Submit',
    close: 'Close',
    callbackId: ViewSubmission.SubmitOnboardForm,
  })
    .blocks(blocks)
    .buildToJSON();
}
