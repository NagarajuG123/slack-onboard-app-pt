import { BlockCollection, Section } from 'slack-block-builder';

export function postToDefaultChannel(senderNumber, senderName, message): any {
  const blocks = [
    Section()
      .fields(senderName !== undefined ? ` *Sender Name* : ${senderName}` : '')
      .fields(
        senderNumber !== undefined ? ` *Sender Number* : ${senderNumber}` : '',
      )
      .fields(message !== undefined ? ` *Message* :\n _${message}_` : ''),
  ];

  return BlockCollection(blocks);
}
