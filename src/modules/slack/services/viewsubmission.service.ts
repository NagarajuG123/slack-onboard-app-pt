import { Injectable } from '@nestjs/common';
import { UsersInfoResponse } from '@slack/web-api';
import { RollbarLogger } from 'nestjs-rollbar';
import { JobRoleService } from 'src/modules/job-role/job-role.service';
import { MailService } from 'src/modules/mail/mail.service';
import { UserService } from 'src/modules/user/user.service';
import { WorkspaceService } from 'src/modules/workspace/workspace.service';
import { noViewHome } from 'src/providers/blocks/Home';

@Injectable()
export class ViewSubmissionService {
  constructor(
    private _userService: UserService,
    private _rollbarLogger: RollbarLogger,
    private _workspaceService: WorkspaceService,
    private _mailService: MailService,
    private _jobRoleService: JobRoleService,
  ) {}

  async processUserOnboard(context, view) {
    const {
      add_user_name_block,
      add_user_email_block,
      add_user_mobile_num_block,
      select_user_role_block,
      select_job_role_block,
      get_project_name_block,
    } = view.state.values;

    let userName = add_user_name_block.add_user_name_action.value;
    let userEmail = add_user_email_block.add_user_email_action.value;
    let userMobile = add_user_mobile_num_block.add_user_mobile_num_action.value;
    let userRole =
      select_user_role_block.select_user_role_action.selected_option.value;
    let jobRole =
      select_job_role_block.select_job_role_action.selected_option.value;

    let projectName = get_project_name_block
      ? get_project_name_block.get_project_name_action.value
      : null;

    let workspace = await this._workspaceService.findOne({
      _id: context.teamId,
    });

    let selectedJobRole = await this._jobRoleService.findOne({ name: jobRole });

    let user = await await this._userService.findOne({ email: userEmail });

    if (!user) {
      let userData = {
        workspace: workspace._id,
        name: userName,
        email: userEmail,
        mobileNumber: userMobile,
        userRole: userRole,
        jobRole: selectedJobRole._id,
        projectName: projectName,
      };
      let user = await this._userService.create(userData);
    }

    let response = await this._mailService.sendMail(
      userEmail,
      userName,
      workspace.slackInvite,
    );
  }

  async saveSlackInvite(context, view) {
    const { get_slack_invite_link_block } = view.state.values;

    let slackInvite =
      get_slack_invite_link_block.get_slack_invite_link_action.value;

    try {
      await this._workspaceService.findByIdAndUpdate(context.teamId, {
        slackInvite: slackInvite,
      });
    } catch (error) {
      this._rollbarLogger.error(error);
    }
  }

  async saveJobRole(context, view) {
    const {
      get_jobrole_name_block,
      get_public_channel_names_block,
      get_private_channel_names_block,
      select_projectchannel_required_block,
    } = view.state.values;

    //console.log(view.state.values);

    let name = get_jobrole_name_block.get_jobrole_name_action.value;
    //let noOfChannels = get_no_of_channels_block.get_no_of_channels_action.value;
    // let channelType =
    //   select_channel_type_block.select_channel_type_action.selected_option
    //     .value;

    let publicChannelNames =
      get_public_channel_names_block.get_public_channel_names_action.value;
    let privateChannelNames =
      get_private_channel_names_block.get_private_channel_names_action.value;
    let has_projectChannels =
      select_projectchannel_required_block.select_projectchannel_required_action
        .selected_option.value;

    let jobRoleData = {
      name: name,
      publicChannelNames: publicChannelNames,
      privateChannelNames: privateChannelNames,
      has_projectChannels: has_projectChannels == 'Yes' ? true : false,
      workspace: context.teamId,
    };

    await this._jobRoleService.create(jobRoleData);
  }
}
