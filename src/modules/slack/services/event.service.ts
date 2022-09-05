import { Injectable } from '@nestjs/common';
import { UsersInfoResponse } from '@slack/web-api';
import { RollbarLogger } from 'nestjs-rollbar';
import { JobRoleService } from 'src/modules/job-role/job-role.service';
import { User } from 'src/modules/user/user.schema';
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
    private _jobRoleService: JobRoleService,
  ) {}

  async HomeTab(event, context, client) {
    try {
      const { user } = (await this._slackApiService.usersInfo(
        context.botToken,
        event.user,
      )) as UsersInfoResponse;
      const workspace = await this._workspaceService.findOne({
        botAccessToken: context.botToken,
      });
      const view = user.is_admin ? adminHome() : noViewHome();
      await client.views.publish({
        user_id: user.id,
        view: view,
      });
    } catch (error) {
      this._rollbarLogger.error(`Event Service - HomeTab ${error}`);
    }
  }

  async processUserJoin(event, context, client) {
    let userEmail = event.user.profile.email;
    let slackUniqueId = event.user.id;
    try {
      let userExists = await this._userService.findOne({ email: userEmail });
      if (userExists) {
        let updatedUser = await this._userService.findByIdAndUpdate(
          userExists._id,
          { slackUniqueId: slackUniqueId },
        );
        await this.createChannels(updatedUser, client, context.botAccessToken);
      }
    } catch (error) {
      this._rollbarLogger.error(`Event Service - processUserJoin ${error}`);
    }
  }

  async createChannels(updatedUser: User, client, botAccessToken) {
    let createChannelResponse;
    let user = await this._userService.findOne({ _id: updatedUser._id });
    let jobRole = await this._jobRoleService.findOne({ _id: user.jobRole });

    let userChannelNames = jobRole.privateChannelNames;
    let projectChannelNames = jobRole.publicChannelNames;

    let userName = user.name;
    let projectName = user.projectName;
    let privateChannels = userChannelNames.split(',');
    let publicChannels = projectChannelNames.split(',');
    let projectRegex = /<projectname>/gi;
    let userRegex = /<username>/gi;
    let roleRegex = /<role>/gi;
    let finalPrivateChannels = [];
    for (let name of privateChannels) {
      let projectnameReplaced = name.replace(projectRegex, projectName);
      let usernameReplaced = projectnameReplaced.replace(userRegex, userName);
      let rolenameReplaced = usernameReplaced.replace(roleRegex, jobRole.name);

      finalPrivateChannels.push({
        name: rolenameReplaced.toLowerCase(),
        type: 'private',
      });
    }

    let finalPublicChannels = [];
    for (let name of publicChannels) {
      let projectnameReplaced = name.replace(projectRegex, projectName);
      let usernameReplaced = projectnameReplaced.replace(userRegex, userName);
      let rolenameReplaced = usernameReplaced.replace(roleRegex, jobRole.name);
      finalPublicChannels.push({
        name: rolenameReplaced.toLowerCase(),
        type: 'public',
      });
    }

    let channelNames = [...finalPrivateChannels, ...finalPublicChannels];
    let channelIds = [];

    for (let channel of channelNames) {
      try {
        createChannelResponse = await client.conversations.create({
          token: botAccessToken,
          name: channel.name,
          is_private: channel.type == 'public' ? false : true,
        });
        if (
          createChannelResponse.ok == false &&
          createChannelResponse.error == 'name_taken'
        ) {
          let response = await client.conversations.create({
            token: botAccessToken,
            name: channel.name + 1,
            is_private: channel.type == 'public' ? false : true,
          });
          channelIds.push(response.channel.id);
        } else {
          channelIds.push(createChannelResponse.channel.id);
        }
      } catch (error) {
        this._rollbarLogger.error(`Event Service - createChannels ${error}`);
      }
    }
    await this._userService.findByIdAndUpdate(user._id, {
      channelIds: channelIds,
    });

    //Add user to channels
    for (let id of channelIds) {
      try {
        let addUserResponse = await client.conversations.invite({
          token: botAccessToken,
          channel: id,
          users: user.slackUniqueId,
        });
      } catch (error) {
        this._rollbarLogger.error(
          `Event Service - createChannels - userJoin ${error}`,
        );
      }
    }
  }
}
