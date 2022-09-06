import { BlockCollection, Blocks, Elements } from 'slack-block-builder';
import { Action } from 'src/enums/Actions.enum';

export function header() {
  const blocks = [];
  blocks.push(
    Blocks.Section()
      .text(`\t`)
      .accessory(
        Elements.Button().actionId(Action.RefreshHome).text('Refresh Page'),
      ),
    Blocks.Section()
      .text(`Add global channel members`)
      .accessory(
        Elements.Button()
          .actionId(Action.AddGlobalChannelMembers)
          .text('Add Global Channel Members')
          .primary(),
      ),
    Blocks.Actions().elements(
      Elements.Button({
        text: 'OnBoard User',
        actionId: Action.OnboardUser,
      }).primary(),
      Elements.Button({
        text: 'Add Slack invite link',
        actionId: Action.AddSlackInvite,
      }).primary(),
      Elements.Button({
        text: 'Add Job Role',
        actionId: Action.AddJobRoles,
      }).primary(),
    ),
    Blocks.Divider(),
    // Blocks.Actions().elements(
    //   Elements.Button()
    //     .actionId(Action.AddUser)
    //     .text('Add User Details')
    //     .primary(),
    // ),
  );

  return blocks;
}
