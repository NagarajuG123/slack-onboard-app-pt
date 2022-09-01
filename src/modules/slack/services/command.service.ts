import { Injectable } from '@nestjs/common';
import { RollbarLogger } from 'nestjs-rollbar';
import { UserService } from 'src/modules/user/user.service';
import { WorkspaceService } from 'src/modules/workspace/workspace.service';

@Injectable()
export class CommandService {
  constructor() // private _rollbarLogger: RollbarLogger,
  // private _userService: UserService,
  // private _workspaceService: WorkspaceService,
  {}
}
