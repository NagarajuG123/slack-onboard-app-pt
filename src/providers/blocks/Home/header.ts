import { BlockCollection, Blocks, Elements } from 'slack-block-builder';
import { Action } from 'src/enums/Actions.enum';

export function header(default_channel?) {
  const blocks = [];
  blocks.push(
    Blocks.Section()
      .text(`\t`)
      .accessory(
        Elements.Button().actionId(Action.RefreshHome).text('Refresh Page'),
      ),
    Blocks.Section()
      .text(
        default_channel !== null
          ? `Default Channel : <#${default_channel}>`
          : `Default channel is not added yet`,
      )
      .accessory(
        Elements.Button()
          .actionId(Action.AddOrUpdateDefaultChannel)
          .text('Add/Update Default Channel')
          .primary(),
      ),
    Blocks.Divider(),
    Blocks.Actions().elements(
      Elements.Button()
        .actionId(Action.AddUser)
        .text('Add User Details')
        .primary(),
    ),
  );

  return blocks;
}
