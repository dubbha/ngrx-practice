import { ActionReducerMap } from '@ngrx/store';

import { TasksState } from './tasks.state';
import { tasksReducer } from './../reducers';

export interface AppState {
  tasks: TasksState;
}

export const reducers: ActionReducerMap<AppState> = {
  tasks: tasksReducer
};
