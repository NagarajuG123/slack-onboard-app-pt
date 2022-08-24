import { Injectable } from '@nestjs/common';
import { Action } from 'src/enums/Actions.enum';
import {Event} from 'src/enums/events.enum';
import { ViewSubmission } from 'src/enums/view-submissions.enum';
import { ActionService } from './services/action.service';
import { EventService } from './services/event.service';
import { ViewSubmissionService } from './services/viewsubmission.service';

@Injectable()
export class SlackService {
    constructor(
        private _eventService : EventService,
        private _actionService : ActionService,
        private _viewSubmissionService : ViewSubmissionService
    ){}
    async initSlack(boltApp){
      boltApp.event(
        Event.AppHomeOpened,async ({event,context,client}) => {
           await this._eventService.HomeTab(event,context,client);
        }
      )

      boltApp.action(
        Action.AddUser,async({ack,body,context,client}) => {
          await ack();
          await this._actionService.addUser(body,context,client);
        }
      )

      boltApp.action(
        Action.EditUserDetails,async({ack,body,context,client}) => {
          await ack();
          await this._actionService.editUserDetails(body,context,client);
        }
      )

      boltApp.action(
        Action.DeleteUserDetails,async({ack,body,context,client}) => {
          await ack();
          await this._actionService.deleteUserDetails(body,context,client);
        }
      )

      boltApp.action(
        Action.SelectUser,async({ack,context}) => {
          await ack();
        }
      )

      boltApp.action(
        Action.AddWhatsAppNumber,async({ack,context}) => {
          await ack();
        }
      )

      boltApp.action(
        Action.SelectAvailabilityChannel,async({ack,context}) => {
          await ack();
        }
      )

      boltApp.action(
        Action.RefreshHome,async({ack,context,client,body}) => {
          await ack();
          await this._actionService.refreshHome(context,client,body);
        }
      )

      boltApp.action(
        Action.AddOrUpdateDefaultChannel,async({ack,context,client,body}) => {
          await ack();
          await this._actionService.addDefaultChannel(context,client,body);
        }
      )

      
      boltApp.action(
        Action.SelectDefaultAvailabilityChannel,async({ack}) => {
          await ack();
        }
      )

      

      boltApp.view(
        ViewSubmission.SubmitUserDetails,async({ack,view,client,context,body}) => {
          await ack();
          await this._viewSubmissionService.SaveUserDetails(body,view,client,context);
        }
      )

      boltApp.view(
        ViewSubmission.UpdateUserDetails,async({ack,view,client,context,body}) => {
          await ack();
          await this._viewSubmissionService.updateUserDetails(body,view,client,context);
        }
      )

      boltApp.view(
        ViewSubmission.SubmitDefaultAvailabilityChannel,async({ack,view,client,context,body}) => {
          await ack();
          await this._viewSubmissionService.saveDefaultChannel(body,view,client,context);
        }
      )

      }

    
}
