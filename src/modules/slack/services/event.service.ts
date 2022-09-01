import { Injectable } from '@nestjs/common';
import { UsersInfoResponse } from '@slack/web-api';
import { RollbarLogger } from 'nestjs-rollbar';
import { UserService } from 'src/modules/user/user.service';
import { WorkspaceService } from 'src/modules/workspace/workspace.service';
import { adminHome, noViewHome } from 'src/providers/blocks/Home';
import { SlackApiService } from 'src/shared/services/slackapi.service';

@Injectable()
export class EventService {
  constructor(
    private _workspaceService: WorkspaceService,
    private _userService: UserService,
    private _slackApiService: SlackApiService,
    private _rollbarLogger: RollbarLogger,
  ) {}

  async HomeTab(event, context, client) {
    try {
      console.log('inside HomeTab');
      const { user } = (await this._slackApiService.usersInfo(
        context.botToken,
        event.user,
      )) as UsersInfoResponse;
      const workspace = await this._workspaceService.findOne({
        botAccessToken: context.botToken,
      });
      const view = user.is_admin ? adminHome() : noViewHome();
      console.log(view);
      await client.views.publish({
        user_id: user.id,
        view: view,
      });
    } catch (error) {
      this._rollbarLogger.error(error);
    }
  }
}
