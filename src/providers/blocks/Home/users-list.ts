import { Blocks, Elements } from 'slack-block-builder';
import { Action } from 'src/enums/Actions.enum';

export function usersList(users) {
  const blocks = [];
  users = users.slice(0, 3);

  if (users && users.length !== 0) {
    for (let user of users) {
      blocks.push(
        Blocks.Section().text(
          `User Name: <@${user.unique_id}> \n Availability Channel: <#${user.availability_channel_id}>`,
        ),
        Blocks.Actions().elements(
          Elements.Button()
            .actionId(Action.EditUserDetails)
            .primary()
            .text(`Edit`)
            .value(JSON.stringify(user)),
          Elements.Button()
            .actionId(Action.DeleteUserDetails)
            .danger()
            .text(`Delete`)
            .value(JSON.stringify(user)),
        ),
        Blocks.Divider(),
      );
    }
  }
  return blocks;
}
