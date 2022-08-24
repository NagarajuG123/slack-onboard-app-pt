import {
    BlockCollection,
    bold,
    Message,
    Modal,
    Section,
} from 'slack-block-builder';


export function postToDefaultChannel(senderNumber,senderName,message): any {

    const blocks = [
        Section()
        .fields(senderNumber !== undefined ? `*Sender Name*: ${senderName}` : '')
        .fields(senderName !== undefined ? `*Sender Number*: ${senderNumber}` : '')
        .fields(message !== undefined ? `*Message*:\n ${message}` : '')
	];

    return BlockCollection(blocks)
}