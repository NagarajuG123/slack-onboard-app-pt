import { Body, Injectable } from '@nestjs/common';
import { error } from 'console';
import { Action } from 'src/enums/Actions.enum';
import { Event } from 'src/enums/events.enum';
import { ViewSubmission } from 'src/enums/view-submissions.enum';
import { addJobRolesModal } from 'src/providers/blocks/modals/addJobRole-modal';
import { ActionService } from './services/action.service';
import { EventService } from './services/event.service';
import { ViewSubmissionService } from './services/viewsubmission.service';

@Injectable()
export class SlackService {
  constructor(
    private _eventService: EventService,
    private _actionService: ActionService,
    private _viewSubmissionService: ViewSubmissionService,
  ) {}
  async initSlackEvent(boltApp: any) {
    boltApp.event(Event.AppHomeOpened, async ({ event, context, client }) => {
      await this._eventService.HomeTab(event, context, client);
    });

    boltApp.event(Event.TeamJoin, async ({ event, context, client }) => {
      await this._eventService.processUserJoin(event, context, client);
    });
  }
  async initSlackAction(boltApp) {
    boltApp.action(
      Action.OnboardUser,
      async ({ ack, context, client, body }) => {
        await ack();
        await this._actionService.openOnboardForm(context, client, body);
      },
    );

    boltApp.action(Action.AddUserName, async ({ ack }) => {
      await ack();
    });

    boltApp.action(
      Action.RefreshHome,
      async ({ ack, client, body, context }) => {
        await ack();
        console.log(body);
        await this._actionService.refreshPage(client, body);
      },
    );

    boltApp.action(Action.AddUserEmailAddress, async ({ ack }) => {
      await ack();
    });

    boltApp.action(Action.AddUserMobileNumber, async ({ ack }) => {
      await ack();
    });

    boltApp.action(Action.SelectUserRole, async ({ ack }) => {
      await ack();
    });

    boltApp.action(
      Action.SelectJobRole,
      async ({ ack, context, client, body }) => {
        await ack();
        await this._actionService.addProjectNameBlock(context, client, body);
      },
    );

    boltApp.action(Action.GetJobRoleName, async ({ ack }) => {
      await ack();
    });

    boltApp.action(Action.GetNoofChannels, async ({ ack, client, body }) => {
      await ack();
      console.log(body);
      //await this._actionService.addChannelsInput(client, body);
    });

    boltApp.action(Action.SelectChannelType, async ({ ack }) => {
      await ack();
    });

    boltApp.action(Action.AddSlackInvite, async ({ ack, body, client }) => {
      await ack();
      await this._actionService.openAddSlackInviteModal(client, body);
    });

    boltApp.action(Action.AddJobRoles, async ({ ack, body, client }) => {
      await ack();
      await this._actionService.openAddJobRolesModal(client, body);
    });
  }
  async initSlackViewSubmission(boltApp) {
    boltApp.view(
      ViewSubmission.SubmitOnboardForm,
      async ({ ack, context, client, body, view }) => {
        await ack();
        await this._viewSubmissionService.processUserOnboard(context, view);
      },
    );

    boltApp.view(
      ViewSubmission.SubmitJobRole,
      async ({ ack, context, view }) => {
        await ack();
        await this._viewSubmissionService.saveJobRole(context, view);
      },
    );
  }

  async initSlackCommand(boltApp) {
    boltApp.command('/onboard', async ({ ack, command, respond }) => {
      await ack();
      await respond(`Hello <@${command.user_id}>,I'm Onboard Bot`);
    });
  }
}
