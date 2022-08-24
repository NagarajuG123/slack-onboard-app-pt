import {
    Blocks,
    bold,
    Elements,
    HomeTab,
    setIfTruthy,
} from 'slack-block-builder';
import { Action } from 'src/enums/Actions.enum';


export function adminHome(users = [],default_channel?): any {
    console.log(users);
    const blocks = [];
    blocks.push(
        Blocks.Section()
        .text(`\t`)
        .accessory(
            Elements.Button()
            .actionId(Action.RefreshHome)
            .text('Refresh Page')
            .value(JSON.stringify(users))
        ),
        Blocks.Section()
        .text(default_channel !== null  ? `Default Channel : <#${default_channel}>` : `Default channel is not added yet`)
        .accessory(
            Elements.Button()
            .actionId(Action.AddOrUpdateDefaultChannel)
            .text('Add/Update Default Channel')
            .primary()
        ),  
        Blocks.Divider(),        
        Blocks.Actions()
        .elements(
            Elements.Button()
            .actionId(Action.AddUser)
            .text('Add User Details')
            .primary()
        ),
    )


    setIfTruthy(users.length !== 0,
        blocks.push(
            Blocks.Section()
            .text(bold(`User's List`)),
            Blocks.Divider()
            ),   
        )
    if(users && users.length !== 0){
        for(let user of users){
            blocks.push(
                 Blocks.Section()
                 .text(`User Name: <@${user.unique_id}> \n Availability Channel: <#${user.availability_channel_id}>`),
                 Blocks.Actions()
                 .elements(
                    Elements.Button()
                    .actionId(Action.EditUserDetails)
                    .primary()
                    .text(`Edit`)
                    .value(JSON.stringify(user)),
                    Elements.Button()
                    .actionId(Action.DeleteUserDetails)
                    .danger()
                    .text(`Delete`)
                    .value(JSON.stringify(user))
                 ),
                 Blocks.Divider()
            )
        }
    }
    

    return HomeTab().blocks(blocks).buildToJSON();
}
