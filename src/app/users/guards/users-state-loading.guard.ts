import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState, getUsersLoaded } from './../../+store';
import * as UsersActions from './../../+store/actions/users.actions';

import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class UsersStateLoadingGuard implements CanActivate {

    constructor(
        private store: Store<AppState>
    ) {}

    canActivate() {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    private checkStore(): Observable<boolean> {
        return this.store.select(getUsersLoaded)
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                        this.store.dispatch(new UsersActions.GetUsers);
                    }
                }),
                take(1)
            );
    }
}
