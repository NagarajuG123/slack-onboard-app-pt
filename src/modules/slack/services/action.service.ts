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
import { addJobRolesModal } from 'src/providers/blocks/modals/addJobRole-modal';
import { JobRoleService } from 'src/modules/job-role/job-role.service';
import { addGlobalChannelMembers } from 'src/providers/blocks/modals/addGlobalChannelMembers-modal';

@Injectable()
export class ActionService {
  constructor(
    private _userService: UserService,
    private _rollbarLogger: RollbarLogger,
    private _workspaceService: WorkspaceService,
    private _jobRoleService: JobRoleService,
  ) {}

  async openOnboardForm(context, client, body) {
    let userRoles = [
      { text: 'Candidate', value: 'candidate' },
      { text: 'Intern', value: 'intern' },
      { text: 'Vendor', value: 'vendor' },
      { text: 'Employee', value: 'employee' },
    ];

    let jobRoles = await this._jobRoleService.findall({
      workspace: context.teamId,
    });

    let jobRoleOptions = [];

    for (let role of jobRoles) {
      jobRoleOptions.push(role.name);
    }

    //console.log(jobRoleOptions);
    client.views.open({
      trigger_id: body.trigger_id,
      view: onboardUser(jobRoleOptions),
    });
  }

  async openAddSlackInviteModal(client, body) {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: getSlackInvite(),
    });
  }

  async openAddJobRolesModal(client, body) {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: addJobRolesModal(),
    });
  }

  async refreshPage(client, body) {
    await client.views.publish({
      user_id: body.user.id,
      view: adminHome(),
    });
  }

  async addProjectNameBlock(context, client, body) {
    let jobRoleOptions = [];
    const { actions } = body;
    //console.log(actions);
    const value = actions[0].selected_option.value;
    let jobRole = await this._jobRoleService.findOne({ name: value });
    let jobRoles = await this._jobRoleService.findall({
      workspace: context.teamId,
    });
    for (let role of jobRoles) {
      jobRoleOptions.push(role.name);
    }
    //console.log(jobRole);
    if (jobRole.has_projectChannels) {
      client.views.update({
        view_id: body.view.id,
        view: onboardUser(jobRoleOptions, jobRole.has_projectChannels),
      });
    }
  }

  async openAddGlobalChannelMembersModal(client, context, body) {
    try {
      let workspace = await this._workspaceService.findOne({
        _id: context.teamId,
      });

      await client.views.open({
        trigger_id: body.trigger_id,
        view: addGlobalChannelMembers(workspace.globalChannelMembers),
      });
    } catch (error) {
      this._rollbarLogger.error(
        `Action Service - openAddGlobalChannelMembersModal ${error}`,
      );
    }
  }

  // async addChannelsInput(client, body) {
  //   const channelsCount = body.actions[0].selected_option.value;
  //   console.log(channelsCount);
  //   client.views.update({
  //     view_id: body.view.id,
  //     view: addJobRolesModal(parseInt(channelsCount)),
  //   });
  // }
}
