import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UsersEffects, usersReducer } from '../+store';


import { UsersRoutingModule, usersRouterComponents } from './users.routing.module';

import { UserComponent, UserArrayService, UserObservableService, UserResolveGuard } from '.';
import { UsersAPIProvider } from './users.config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects])
  ],
  declarations: [
    usersRouterComponents,
    UserComponent,
  ],
  providers: [
    UserArrayService,
    UserObservableService,
    UsersAPIProvider,
    UserResolveGuard
  ]
})
export class UsersModule {}
