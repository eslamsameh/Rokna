///<reference path="../../node_modules/@types/node/index.d.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {profileComponent}from './profileComponent'
import {AppComponent} from './app.component';
import {DataService} from  './DataService'
import {SignalRService} from  './SignalRService'
import {BasketService} from  './BasketService'
import {RegComponent} from './RegComponent'
import {login} from './login.component'
import {Router, RouterModule}from '@angular/router'
import {homecomponent}from './HomeCompanent'
import {detailscomponent}from './DetailComponent'
import {UserCommentComponent}from './UserCommentComponent'
import {RatingModule} from 'ngx-rating';
import {AgmCoreModule} from '@agm/core';
import {adminComponent}from './adminComponent'
import {productcomponent}from './productcomponent'
import {purchescomponent}from './purchescomponent'
import {NguiPopupModule} from '@ngui/popup';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import {FusionChartsComponent, FusionChartsModule} from 'angular2-fusioncharts';
import {reportComponent}from './reportComponent'
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';
import '../../node_modules/jquery/dist/jquery.js';
import '../../node_modules/signalr/jquery.signalR.js';
import {Complain} from './Complain'

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';
// Load FusionCharts Charts module
let Charts = require('fusioncharts/fusioncharts.charts');

// Create FusionCharts provider function
export function FusionChartsProvider () {
  // Resolve charts dependency
  Charts(FusionCharts);

  return FusionCharts;
}

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'complain';
  c.url = 'http://localhost:49588';
  c.logging = true;
  return c;
}



@NgModule({
  declarations: [
    AppComponent, RegComponent, login, profileComponent, homecomponent, detailscomponent, UserCommentComponent,
    adminComponent, productcomponent, purchescomponent,reportComponent,Complain
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RatingModule,
    NguiPopupModule,
    NguiAutoCompleteModule,
    FusionChartsModule.forRoot(FusionChartsProvider),
    SignalRModule.forRoot(createConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCLdz2vurfLiUomFNdOD4En3WkrojMS2Zo'
    }),
    RouterModule.forRoot([
      {path: '', component: login},
      {path: 'login', component: login},
      {path: 'Reg', component: RegComponent},
      {path: 'profile', component: profileComponent},
      {path: 'Home', component: homecomponent},
      {path: 'Detail/:id/:companyid', component: detailscomponent},
      {path: 'admin', component: adminComponent},
      {path: 'report', component: reportComponent},
      {path: 'complain', component: Complain}

    ])

  ],
  providers: [DataService, BasketService,SignalRService],
  bootstrap: [AppComponent]
})

export class AppModule {

}










