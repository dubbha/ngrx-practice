import { Injectable } from '@angular/core';

// @Ngrx
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { TasksActionTypes } from './../actions';
import * as TasksActions from './../actions/tasks.actions';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import { TaskPromiseService } from './../../tasks/services';

@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private taskPromiseService: TaskPromiseService,
  ) {
    console.log('[TASKS EFFECTS]');
  }

  @Effect() getTasks$: Observable<Action> = this.actions$
    // Instead of ofType<TasksActions.GetTasks>(...) you can use ofType(...)
    // It's optional.
    // Specify the action type to allow type-safe mapping to other data on the action,
    // including payload
    .ofType<TasksActions.GetTasks>(TasksActionTypes.GET_TASKS)
    .pipe(
      switchMap(action =>
        this.taskPromiseService.getTasks()
          .then(tasks => new TasksActions.GetTasksSuccess(tasks) )
          .catch(err => new TasksActions.GetTasksError(err))
      )
    );


}
