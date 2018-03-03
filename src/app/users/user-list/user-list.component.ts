import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

// rxjs
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { catchError, switchMap } from 'rxjs/operators';

import { User } from './../models/user.model';
import * as UsersActions from './../../+store/actions/users.actions';
import { AppState, getUsers, getUsersError, getEditedUser } from './../../+store';
import { AutoUnsubscribe } from './../../core/decorators';
import * as RouterActions from './../../+store/actions/router.actions';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
@AutoUnsubscribe('subscription')
export class UserListComponent implements OnInit {
  users$: Store<Array<User>>;
  usersError$: Store<Error | string>;
  private subscription: Subscription;

  private editedUser: User;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.users$ = this.store.select(getUsers);
    this.usersError$ = this.store.select(getUsersError);
    this.store.dispatch(new UsersActions.GetUsers());

    // listen id from UserFormComponent
    this.subscription = this.store.select(getEditedUser)
    .subscribe(
      user => {
        this.editedUser = user;
        console.log(`Last time you edited user ${JSON.stringify(this.editedUser)}`);
      }
    );
  }

  editUser(user: User) {
    const link = ['/users/edit', user.id];
    this.store.dispatch(new RouterActions.Go({
      path: link
    }));
  }

  isEdited(user: User) {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  deleteUser(user: User) {
    this.store.dispatch(new UsersActions.DeleteUser(user));
  }

}
