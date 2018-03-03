import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState, getTasksLoaded, getTasksData } from './../../+store';
import * as TasksActions from './../../+store/actions/tasks.actions';
import * as RouterActions from './../../+store/actions/router.actions';

import { Observable } from 'rxjs/observable';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { Task } from './../models/task.model';

@Injectable()
export class TaskExistGuard implements CanActivate {

    constructor(
        private store: Store<AppState>
    ) {}

    canActivate(route: ActivatedRouteSnapshot) {
        return this.checkStore().pipe(
            switchMap(() => {
                const id = +route.paramMap.get('id');
                return this.hasTask(id);
            })
        );
    }

    private hasTask(id: number): Observable<boolean> {
        return this.store.select(getTasksData)
        .pipe(
           map(tasks => !!tasks.find(task => task.id === id)),
           tap(result => {
               if (!result) {
                   this.store.dispatch(new RouterActions.Go({path: ['/home']}));
               }
           }),
           take(1)
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
