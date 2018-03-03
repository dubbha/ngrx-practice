import { Action } from '@ngrx/store';

import { User } from './../../users/models/user.model';

// Actions
// [Users] - namespace
export class UsersActionTypes {
  static readonly GET_USERS           = '[Users] GET_USERS';
  static readonly GET_USERS_SUCCESS   = '[Users] GET_USERS_SUCCESS';
  static readonly GET_USERS_ERROR     = '[Users] GET_USERS_ERROR';
  static readonly GET_USER            = '[Users] GET_USER';
  static readonly GET_USER_SUCCESS    = '[Users] GET_USER_SUCCESS';
  static readonly GET_USER_ERROR      = '[Users] GET_USER_ERROR';
  static readonly CREATE_USER         = '[Users] CREATE_USER';
  static readonly CREATE_USER_SUCCESS = '[Users] CREATE_USER_SUCCESS';
  static readonly CREATE_USER_ERROR   = '[Users] CREATE_USER_ERROR';
  static readonly UPDATE_USER         = '[Users] UPDATE_USER';
  static readonly UPDATE_USER_SUCCESS = '[Users] UPDATE_USER_SUCCESS';
  static readonly UPDATE_USER_ERROR   = '[Users] UPDATE_USER_ERROR';
  static readonly DELETE_USER         = '[Users] DELETE_USER';
  static readonly DELETE_USER_SUCCESS = '[Users] DELETE_USER_SUCCESS';
  static readonly DELETE_USER_ERROR   = '[Users] DELETE_USER_ERROR';
}

// Action Creators
export class GetUsers implements Action {
  readonly type = UsersActionTypes.GET_USERS;
  constructor(public payload?: User) {}
}

export class GetUsersSuccess implements Action {
  readonly type = UsersActionTypes.GET_USERS_SUCCESS;
  constructor(public payload: User[]) {}
}

export class GetUsersError implements Action {
  readonly type = UsersActionTypes.GET_USERS_ERROR;
  constructor(public payload: Error | string) {}
}

export class GetUser implements Action {
  readonly type = UsersActionTypes.GET_USER;
  constructor(public payload: number) {}
}

export class GetUserSuccess implements Action {
  readonly type = UsersActionTypes.GET_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class GetUserError implements Action {
  readonly type = UsersActionTypes.GET_USER_ERROR;
  constructor(public payload: Error | string) {}
}

export class CreateUser implements Action {
  readonly type = UsersActionTypes.CREATE_USER;
  constructor(public payload: User) {}
}

export class CreateUserSuccess implements Action {
  readonly type = UsersActionTypes.CREATE_USER_SUCCESS;
  constructor(public payload: User) { }
}

export class CreateUserError implements Action {
  readonly type = UsersActionTypes.CREATE_USER_ERROR;
  constructor(public payload: Error | string) {}
}

export class UpdateUser implements Action {
  readonly type = UsersActionTypes.UPDATE_USER;
  constructor(public payload: User) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UsersActionTypes.UPDATE_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class UpdateUserError implements Action {
  readonly type = UsersActionTypes.UPDATE_USER_ERROR;
  constructor(public payload: Error | string) {}
}

export class DeleteUser implements Action {
  readonly type = UsersActionTypes.DELETE_USER;
  constructor(public payload: User) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = UsersActionTypes.DELETE_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class DeleteUserError implements Action {
  readonly type = UsersActionTypes.DELETE_USER_ERROR;
  constructor(public payload: Error | string) {}
}

export type UsersActions
  = GetUsers
  | GetUsersSuccess
  | GetUsersError
  | GetUser
  | GetUserSuccess
  | GetUserError
  | CreateUser
  | CreateUserSuccess
  | CreateUserError
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserError
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserError;
