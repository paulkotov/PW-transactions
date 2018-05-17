import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';

import { AppState } from '../state';
import * as fromApp from './reducer';

export interface RootState {
  app: AppState;
}

export const reducers: ActionReducerMap<RootState> = {
  app: fromApp.reducer
}; 

export function logger(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return function (state: RootState, action: any): RootState {
      console.log('state:', state);
      console.log('action:', action);
      return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<RootState>[] = [logger]; 

export const getAppState = createFeatureSelector<AppState>('app');

//selector
export const getUser = createSelector(
  getAppState,
  fromApp.getUser,
);

//selector
export const getTransaction = createSelector(
  getAppState,
  fromApp.getTransactions,
); 