import { Injectable } from '@nestjs/common';
import { UsersInfoResponse } from '@slack/web-api';
import { RollbarLogger } from 'nestjs-rollbar';
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
  ) {}

  async processUserOnboard(context, view) {
    const {
      add_user_name_block,
      add_user_email_block,
      add_user_mobile_num_block,
      select_user_role_block,
    } = view.state.values;

    let userName = add_user_name_block.add_user_name_action.value;
    let userEmail = add_user_email_block.add_user_email_action.value;
    let userMobile = add_user_mobile_num_block.add_user_mobile_num_action.value;
    let userRole =
      select_user_role_block.select_user_role_action.selected_option.value;

    let workspace = await this._workspaceService.findOne({
      _id: context.teamId,
    });

    let user = await this._userService.findOne({ email: userEmail });
    if (!user) {
      let userData = {
        workspace: workspace._id,
        name: userName,
        email: userEmail,
        mobileNumber: userMobile,
        userRole: userRole,
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
}
