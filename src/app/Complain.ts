/**
 * Created by eslam on 9/22/2017.
 */

import {Component, OnInit} from '@angular/core';
import {SignalRService} from './SignalRService'
import $ from 'jquery';
import 'ms-signalr-client-jquery-3/jquery.signalR.js';
import {BroadcastEventListener} from 'ng2-signalr';
@Component({
  selector: 'complain-comp',
  template: `
    <div>
      <input type="text" (change)="handleComplainInput($event)"/>
      <button (click)="sendComplain()">send complain</button>
    </div>
  `,
})

export class Complain implements OnInit {

  public socketConnection: any;
  public complain: any = '';

  constructor(public signalR: SignalRService) {

  }

  ngOnInit() {
    // hena haft7 el connection bta3 el sockets 3shan lma agy ab3t complain
    this.signalR.resolve().then((connection) => {
      this.socketConnection = connection;
    })
  }

  handleComplainInput(event) {
    this.complain = event.target.value;
  }

  sendComplain() {
    this.socketConnection.invoke('sendComplain', this.complain).then((data: any) => {
    });
  }


}
