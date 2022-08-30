import { Injectable } from '@nestjs/common';
import { RollbarLogger } from 'nestjs-rollbar';
import { UserService } from 'src/modules/user/user.service';
import { WorkspaceService } from 'src/modules/workspace/workspace.service';
import { adminHome } from 'src/providers/blocks/Home';
import { addDefaultChannel } from 'src/providers/blocks/modals/addOrUpdateDefaultChannel-modal';
import { addUserModal } from 'src/providers/blocks/modals/addUser-modal';
import { editUserModal } from 'src/providers/blocks/modals/editUser-modal';
import { failureMessageModal } from 'src/providers/blocks/modals/failure-message-modal';
import { successMessageModal } from 'src/providers/blocks/modals/success-message-modal';
import { Action } from 'src/enums/Actions.enum';

@Injectable()
export class ActionService {
  constructor(
    private _rollbarLogger: RollbarLogger,
    private _userService: UserService,
    private _workspaceService: WorkspaceService,
  ) {}
  async addUser(body, context, client) {
    const { trigger_id } = body;
    await client.views.open({
      trigger_id: trigger_id,
      view: addUserModal(),
    });
  }

  async editUserDetails(body, context, client) {
    const { actions } = body;
    const user = JSON.parse(actions[0].value);
    client.views.open({
      trigger_id: body.trigger_id,
      view: editUserModal(user),
    });
  }

  async deleteUserDetails(body, context, client) {
    const { actions } = body;
    const user = JSON.parse(actions[0].value);
    try {
      let response = await this._userService.delete({ id: user.id });
      let view = response
        ? successMessageModal(`User details deleted successfully`)
        : failureMessageModal('Oops! Unable to delete user details');
      client.views.open({
        trigger_id: body.trigger_id,
        view: view,
      });
    } catch (error) {
      this._rollbarLogger.error(error);
    }
  }

  async refreshHome(context, client, body) {
    const workspace = await this._workspaceService.find({
      team_id: context.teamId,
    });
    let users = await this._userService.find({ workspace_id: workspace.id });
    await client.views.publish({
      user_id: body.user.id,
      view: adminHome(users, users.length, workspace.default_channel),
    });
  }

  async addDefaultChannel(context, client, body) {
    let workspace = await this._workspaceService.find({
      team_id: context.teamId,
    });
    await client.views.open({
      trigger_id: body.trigger_id,
      view: addDefaultChannel(workspace.default_channel),
    });
  }

  async nextOrPreviousUsers(context, client, body) {
    //console.log(context);
    const limit = 3;
    const { actions } = body;
    let { action_id, value } = actions[0];
    let page = JSON.parse(value);
    action_id === Action.NextButton ? page++ : page--;
    let offset = (page - 1) * limit;
    let workspace = await this._workspaceService.find({
      team_id: context.teamId,
    });
    let users = await this._userService.find({ workspace_id: workspace.id });
    let filteredusers = await this._userService.findUserWithPagination(
      workspace.id,
      offset,
      limit,
    );

    let viewfile = adminHome(
      filteredusers,
      users.length,
      workspace.default_channel,
      page,
    );

    await client.views.publish({
      user_id: body.user.id,
      view: viewfile,
    });
  }
}
