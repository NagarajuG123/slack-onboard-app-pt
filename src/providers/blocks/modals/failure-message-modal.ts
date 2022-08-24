import {
    bold,
    Modal,
    Section,
} from 'slack-block-builder';


export function failureMessageModal(message): any {

    const blocks = [
        Section({text: bold(message)})
	];

    return Modal({
        title: 'Failure Message',
        close: 'Close'
      })
      .blocks(blocks)
        .buildToJSON();
}
