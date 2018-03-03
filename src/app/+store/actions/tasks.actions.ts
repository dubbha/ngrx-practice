import { Action } from '@ngrx/store';

import { Task } from './../../tasks/models/task.model';

// [Tasks]- namespace
export class TasksActionTypes {
  static readonly GET_TASKS =   '[Tasks] GET_TASKS';
  static readonly GET_TASKS_SUCCESS = '[Tasks] GET_TASKS_SUCCESS';
  static readonly GET_TASKS_ERROR   = '[Tasks] GET_TASKS_ERROR';
  static readonly GET_TASK = '[Tasks] GET_TASK';
  static readonly GET_TASK_SUCCESS = '[Tasks] GET_TASK_SUCCESS';
  static readonly GET_TASK_ERROR = '[Tasks] GET_TASK_ERROR';
  static readonly CREATE_TASK = '[Tasks] CREATE_TASK';
  static readonly CREATE_TASK_SUCCESS = '[Tasks] CREATE_TASK_SUCCESS';
  static readonly CREATE_TASK_ERROR   = '[Tasks] CREATE_TASK_ERROR';
  static readonly UPDATE_TASK = '[Tasks] UPDATE_TASK';
  static readonly UPDATE_TASK_SUCCESS = '[Tasks] UPDATE_TASK_SUCCESS';
  static readonly UPDATE_TASK_ERROR   = '[Tasks] UPDATE_TASK_ERROR';
  static readonly DELETE_TASK = '[Tasks] DELETE_TASK';
  static readonly DELETE_TASK_SUCCESS = '[Tasks] DELETE_TASK_SUCCESS';
  static readonly DELETE_TASK_ERROR   = '[Tasks] DELETE_TASK_ERROR';
}

export class GetTasks implements Action {
  readonly type = TasksActionTypes.GET_TASKS;
  constructor(public payload?: Task) { }
}

export class GetTasksSuccess implements Action {
  readonly type = TasksActionTypes.GET_TASKS_SUCCESS;
  constructor(public payload: Task[]) { }
}

export class GetTasksError implements Action {
  readonly type = TasksActionTypes.GET_TASKS_ERROR;
  constructor(public payload: Error | string) { }
}

export class GetTask implements Action {
  readonly type = TasksActionTypes.GET_TASK;
  constructor(public payload: string | number) { }
}

export class GetTaskSuccess implements Action {
  readonly type = TasksActionTypes.GET_TASK_SUCCESS;
  constructor(public payload: Task) { }
}

export class GetTaskError implements Action {
  readonly type = TasksActionTypes.GET_TASK_ERROR;
  constructor(public payload: Error | string) { }
}

export class CreateTask implements Action {
  readonly type = TasksActionTypes.CREATE_TASK;
  constructor(public payload: Task) { }
}

export class CreateTaskSuccess implements Action {
  readonly type = TasksActionTypes.CREATE_TASK_SUCCESS;
  constructor(public payload: Task) { }
}

export class CreateTaskError implements Action {
  readonly type = TasksActionTypes.CREATE_TASK_ERROR;
  constructor(public payload: Error | string) { }
}

export class UpdateTask implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK;
  constructor(public payload: Task) { }
}

export class UpdateTaskSuccess implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK_SUCCESS;
  constructor(public payload: Task) { }
}

export class UpdateTaskError implements Action {
  readonly type = TasksActionTypes.UPDATE_TASK_ERROR;
  constructor(public payload: Error | string) { }
}

export class DeleteTask implements Action {
  readonly type = TasksActionTypes.DELETE_TASK;
  constructor(public payload: Task) { }
}

export class DeleteTaskSuccess implements Action {
  readonly type = TasksActionTypes.DELETE_TASK_SUCCESS;
  constructor(public payload: Task) { }
}

export class DeleteTaskError implements Action {
  readonly type = TasksActionTypes.DELETE_TASK_ERROR;
  constructor(public payload: Error | string) { }
}

export type TasksActions
  = GetTasks
  | GetTasksSuccess
  | GetTasksError
  | GetTask
  | GetTaskSuccess
  | GetTaskError
  | CreateTask
  | CreateTaskSuccess
  | CreateTaskError
  | UpdateTask
  | UpdateTaskSuccess
  | UpdateTaskError
  | DeleteTask
  | DeleteTaskSuccess
  | DeleteTaskError;
