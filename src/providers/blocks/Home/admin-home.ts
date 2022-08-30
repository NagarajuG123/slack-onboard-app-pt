import { Blocks, bold, HomeTab, setIfTruthy } from 'slack-block-builder';
import { usersList } from './users-list';
import { header } from './header';
import { footer } from './footer';

export function adminHome(
  users = [],
  usersCount,
  default_channel?,
  page = 1,
): any {
  console.log(users);
  const blocks = [];
  blocks.push(...header(default_channel));

  setIfTruthy(
    users && usersCount !== 0,
    blocks.push(Blocks.Section().text(bold(`User's List`)), Blocks.Divider()),
  );
  blocks.push(...usersList(users));
  blocks.push(...footer(usersCount, page));

  return HomeTab().blocks(blocks).buildToJSON();
}
