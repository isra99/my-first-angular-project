import { reducer } from './appReducers';
import { appReducerState } from './appReducers'
import { ActionReducerMap } from '@ngrx/store';

interface AppState {
    appReducer: appReducerState
}
export const reducers: ActionReducerMap<AppState>= {
    appReducer: reducer
}