import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getTasksData, getTasksError } from './../../+store';
import * as TasksActions from './../../+store/actions/tasks.actions';


import { Task } from './../models/task.model';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Store<ReadonlyArray<Task>>;
  tasksError$: Store<Error | string>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
      console.log('We have a store! ', this.store);
      this.tasks$ = this.store.select(getTasksData);
      this.tasksError$ = this.store.select(getTasksError);

      this.store.dispatch(new TasksActions.GetTasks());
  }

  createTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  completeTask(task: Task): void {
    const doneTask = {...task, done: true};
    this.store.dispatch(new TasksActions.UpdateTask(doneTask));
  }

  deleteTask(task: Task) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }

  editTask(task: Task): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  // private async getTasks() {
  //   this.tasks = await this.taskPromiseService.getTasks();
  // }
}
