import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskListComponent, TaskFormComponent } from '.';
import * as Guards from './guards';

const routes: Routes = [
  {
    path: 'home',
    component: TaskListComponent,
    canActivate: [Guards.TasksStateLoadingGuard],
    data: {
      title: 'Task Manager',
      meta: [{
        name: 'description',
        content: 'Task Manager Application. This is an ASP application'
      },
      {
        name: 'keywords',
        content: 'Angular 4 tutorial, SPA Application, Routing'
      }]
    }
  },
  {
    path: 'add',
    component: TaskFormComponent
  },
  {
    path: 'edit/:id',
    component: TaskFormComponent,
    canActivate: [Guards.TaskExistGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    Guards.allGuards    // same as ...Guards.allGuards
],
})
export class TasksRoutingModule { }
