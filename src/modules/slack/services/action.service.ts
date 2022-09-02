import { Injectable } from '@nestjs/common';
import { RollbarLogger } from 'nestjs-rollbar';
import { UserService } from 'src/modules/user/user.service';
import { WorkspaceService } from 'src/modules/workspace/workspace.service';
import { adminHome } from 'src/providers/blocks/Home';
// import { addDefaultChannel } from 'src/providers/blocks/modals/addOrUpdateDefaultChannel-modal';
// import { addUserModal } from 'src/providers/blocks/modals/addUser-modal';
// import { editUserModal } from 'src/providers/blocks/modals/editUser-modal';
// import { failureMessageModal } from 'src/providers/blocks/modals/failure-message-modal';
// import { successMessageModal } from 'src/providers/blocks/modals/success-message-modal';
import { Action } from 'src/enums/Actions.enum';
import { onboardUser } from 'src/providers/blocks/modals/onboardUser-modal';
import { getSlackInvite } from 'src/providers/blocks/modals/getSlackInvite-modal';

@Injectable()
export class ActionService {
  constructor(
    private _userService: UserService,
    private _rollbarLogger: RollbarLogger,
    private _workspaceService: WorkspaceService,
  ) {}

  async openOnboardForm(context, client, body) {
    let userRoles = [
      { text: 'Candidate', value: 'candidate' },
      { text: 'Intern', value: 'intern' },
      { text: 'Vendor', value: 'vendor' },
      { text: 'Employee', value: 'employee' },
    ];

    console.log(body);
    client.views.open({
      trigger_id: body.trigger_id,
      view: onboardUser(userRoles),
    });
  }

  async openAddSlackInviteModal(client, body) {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: getSlackInvite(),
    });
  }
}
