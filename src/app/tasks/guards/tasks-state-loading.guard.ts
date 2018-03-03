import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getTasksLoaded } from './../../+store';
import * as TasksActions from './../../+store/actions/tasks.actions';

import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { catchError, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class TasksStateLoadingGuard implements CanActivate {

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
        return this.store.select(getTasksLoaded)
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                        this.store.dispatch(new TasksActions.GetTasks);
                    }
                }),
                take(1)
            );
    }
}
