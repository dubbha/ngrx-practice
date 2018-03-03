import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { TasksActionTypes } from './../actions';
import * as TasksActions from './../actions/tasks.actions';

import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import { TaskPromiseService } from './../../tasks/services';

@Injectable()
export class TasksEffects {
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

  @Effect() getTask$: Observable<Action> = this.actions$
    .ofType<TasksActions.GetTask>(TasksActionTypes.GET_TASK)
    .pipe(
      map((action: TasksActions.GetTask) => action.payload),
      switchMap(payload =>
        this.taskPromiseService.getTask(+payload)
          .then(task => new TasksActions.GetTaskSuccess(task) )
          .catch(err => new TasksActions.GetTaskError(err))
      )
    );

  @Effect() updateTask$: Observable<Action> = this.actions$
    .ofType<TasksActions.UpdateTask>(TasksActionTypes.UPDATE_TASK)
    .pipe(
      map((action: TasksActions.UpdateTask) => action.payload),
      switchMap(payload =>
        this.taskPromiseService.updateTask(payload)
          .then(task => {
            this.router.navigate(['/home']);
            return new TasksActions.UpdateTaskSuccess(task);
          })
          .catch(err => new TasksActions.UpdateTaskError(err))
      )
    );

  @Effect() createTask$: Observable<Action> = this.actions$
    .ofType<TasksActions.CreateTask>(TasksActionTypes.CREATE_TASK)
    .pipe(
      map((action: TasksActions.CreateTask) => action.payload),
      switchMap(payload =>
        this.taskPromiseService.createTask(payload)
          .then(task => {
            this.router.navigate(['/home']);
            return new TasksActions.CreateTaskSuccess(task);
          })
          .catch(err => new TasksActions.CreateTaskError(err))
      )
    );

  @Effect() deleteTask$: Observable<Action> = this.actions$
    .ofType<TasksActions.DeleteTask>(TasksActionTypes.DELETE_TASK)
    .pipe(
      map((action: TasksActions.DeleteTask) => action.payload),
      switchMap(payload =>
        this.taskPromiseService.deleteTask(payload)
          .then((/* method delete for this API returns nothing, so we will use payload */) => {
            return new TasksActions.DeleteTaskSuccess(payload);
          })
          .catch(err => new TasksActions.DeleteTaskError(err))
      )
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private taskPromiseService: TaskPromiseService,
  ) {
    console.log('[TASKS EFFECTS]');
  }
}
