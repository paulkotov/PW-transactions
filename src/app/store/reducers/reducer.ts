// import { state } from '@angular/core';

import * as appActions from '../actions';
import { User } from '../../models/user';
import { ActionTypes } from '../actions/ActionTypes';
import { AppState } from '../state';

const initialState: AppState = {
  isAuthenticated : false,
  user:  new User(),
  transactions: [],
};

export function reducer(state = initialState, action:appActions.AppActionTypes): AppState {
  switch (action.type) {
    case ActionTypes.SAVE_USER: {
      let a = action as appActions.SaveUser;
      // console.log(a);
      return {
        ...state,
        isAuthenticated: true,
        user: a.payload
      };
    }
    case ActionTypes.DEL_USER: {
      return {
        ...state,
        isAuthenticated: false,
        user:  new User(),
      };
    }
    default:
      return state;
  }
}

export const getIsAuth = (state: AppState) => state.isAuthenticated;
export const getUser = (state: AppState) => state.user;
export const getTransactions = (state: AppState) => state.transactions;