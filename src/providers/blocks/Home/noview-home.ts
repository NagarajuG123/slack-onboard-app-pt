import {
    bold,
    Divider,
    HomeTab,
    italic,
    Section,
    StaticSelect,
    TimePicker,
} from 'slack-block-builder';

export function noViewHome(): any {

    const blocks = [
        Section({ text: bold(`Sorry! You don't have access to view this Page`) }),
        Divider(),
    ];

    return HomeTab().blocks(blocks).buildToJSON();
}
