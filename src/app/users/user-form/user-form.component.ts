import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState, getUsersOriginalUser, getSelectedUserByUrl } from './../../+store';
import { of } from 'rxjs/observable/of';
import * as UsersActions from './../../+store/actions/users.actions';
import * as RouterActions from './../../+store/actions/router.actions';

// rxjs
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { switchMap } from 'rxjs/operators';

import { AutoUnsubscribe } from '../../core';
import { DialogService, CanComponentDeactivate } from './../../shared';
import { User } from './../models/user.model';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: User;

  constructor(
    private sub: Subscription,
    private store: Store<AppState>,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.sub = this.store.select(getSelectedUserByUrl)
      .subscribe(user => this.user = user);
  }

  saveUser() {
    const user = {...this.user};

    if (user.id) {
      this.store.dispatch(new UsersActions.UpdateUser(user));
    } else {
      this.store.dispatch(new UsersActions.CreateUser(user));
    }
  }

  goBack() {
    this.store.dispatch(new RouterActions.Back());
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const flags = [];
    return this.store.select(getUsersOriginalUser)
      .pipe(
        switchMap(originalUser => {
          for (const key in originalUser) {
            if (originalUser[key] === this.user[key]) {
              flags.push(true);
            } else {
              flags.push(false);
            }
          }

          if (flags.every(el => el)) {
            return of(true);
          }

          // Otherwise ask the user with the dialog service and return its
          // promise which resolves to true or false when the user decides
          return this.dialogService.confirm('Discard changes?');
        })
      );
  }
}
