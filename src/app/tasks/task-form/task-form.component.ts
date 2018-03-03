import { Component, OnInit } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';
import { AppState, getSelectedTaskByUrl } from './../../+store';
import * as TasksActions from './../../+store/actions/tasks.actions';
import * as RouterActions from './../../+store/actions/router.actions';

// rxjs
import { Subscription } from 'rxjs/Subscription';
import { AutoUnsubscribe } from '../../core';

import { Task } from './../models/task.model';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
@AutoUnsubscribe()
export class TaskFormComponent implements OnInit {
  task: Task;

  private sub: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.sub = this.store.select(getSelectedTaskByUrl)
      .subscribe(task => this.task = task);
  }

  saveTask() {
    const task = {...this.task};

    if (task.id) {
      this.store.dispatch(new TasksActions.UpdateTask(task));
    } else {
      this.store.dispatch(new TasksActions.CreateTask(task));
    }
  }

  goBack(): void {
    this.store.dispatch(new RouterActions.Go({
      path: ['/home']
    }));
  }
}
