import {
    BlockCollection,
    Section,
} from 'slack-block-builder';


export function postMessage(message): any {

    const blocks = [
        Section()
        .text(message !== undefined ? message : '')
	];

    return BlockCollection(blocks)
}