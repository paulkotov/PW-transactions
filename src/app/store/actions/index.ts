/* tslint:disable max-classes-per-file */
import { Action } from '@ngrx/store';

import { ActionTypes } from './ActionTypes';
import { User } from '../../models/user';

export class SaveUser implements Action {
  public readonly type = ActionTypes.SAVE_USER;

  constructor(public payload: User) {}
}

export class DelUser implements Action {
  public readonly type = ActionTypes.DEL_USER;
}

export type AppActionTypes
  = SaveUser
  | DelUser;
