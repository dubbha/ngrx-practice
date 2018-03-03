import { Component, OnInit } from '@angular/core';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState } from './../../../+store';
import * as RouterActions from './../../../+store/actions/router.actions';

import { MessagesService } from './../../services';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    public messagesService: MessagesService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
  }

  close() {
    this.store.dispatch(new RouterActions.Go({
      path: [{ outlets: { popup: null } }]
    }));
    this.messagesService.isDisplayed = false;
  }
}
