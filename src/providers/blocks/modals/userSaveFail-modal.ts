import {
    bold,
    Modal,
    Section,
} from 'slack-block-builder';


export function userSaveFailModal(): any {

    const blocks = [
        Section({text: bold('Unable to save User Details 😟')})
	];

    return Modal({
        title: 'Failure Message',
        submit: 'Submit',
        close: 'Close'
      })
      .blocks(blocks)
        .buildToJSON();
}
