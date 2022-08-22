import {
    bold,
    Button,
    Divider,
    HomeTab,
    Section,
} from 'slack-block-builder';
import { Action } from 'src/enums/Actions.enum';


export function adminHome(): any {

    const blocks = [
        Section({ text: bold('Add User Details and Select User Availability Channel') })
        .accessory(
            Button({
                actionId:Action.AddUser,
                text:'Add User'
            })
        ),
        Divider(),
    ];

    return HomeTab().blocks(blocks).buildToJSON();
}
