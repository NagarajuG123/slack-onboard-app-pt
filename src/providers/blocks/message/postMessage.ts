import { BlockCollection, Section } from 'slack-block-builder';

export function postMessage(userId = 'User', message): any {
  const blocks = [
    Section().text(
      message !== undefined ? `<@${userId}> posted "_${message}_"` : '',
    ),
  ];

  return BlockCollection(blocks);
}
