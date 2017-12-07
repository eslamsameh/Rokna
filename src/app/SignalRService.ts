/**
 * Created by eslam on 9/22/2017.
 */

// 1. if you want your component code to be testable, it is best to use a route resolver and make the connection there
import { Resolve } from '@angular/router';
import { SignalR, SignalRConnection } from 'ng2-signalr';
import { Injectable } from '@angular/core';

@Injectable()
export class SignalRService implements Resolve<SignalRConnection> {

  constructor(private _signalR: SignalR)  { }

  resolve() {
    console.log('ConnectionResolver. Resolving...');
    return this._signalR.connect();
  }
}
