import {Component} from '@angular/core';
import {DataService} from './DataService';

@Component({
  selector: 'my-app',
  template: `
    <!-- You can now use fusioncharts component in app.component.html -->
    <button (click)="report()">report</button>
    <input type="date" (change)="catchstartTime($event)"/>
    <input type="date" (change)="catchendTime($event)"/>
    <h1>
      {{title}}
    </h1>
    <fusioncharts
      width="600"
      height="350"
      type="Column2D"
      dataFormat="JSON"
      [dataSource]="dataSource"
    ></fusioncharts>
  `,
})
export class reportComponent {
  dataSource: any = {data: []};
  title: string;
  date: any;
  unit: any;
  starttime: any = '';
  endttime: any = '';

  constructor(public ds: DataService) {
  }

  catchstartTime(date) {
    this.starttime = date.target.value;
  }

  catchendTime(date) {
    this.endttime = date.target.value;

  }

  report() {
    this.dataSource.data = [];


    let dates:any = {
      starttime: this.starttime,
      endtime: this.endttime,
      userid: sessionStorage.getItem("id")
    }

    if (this.starttime != '' && this.endttime === '') {
      dates = {
        date: this.starttime
      }
    }


    this.ds.report(dates).subscribe(resp => {
      let mydata = resp.json().pr2;
      mydata.map((v, i) => {
        this.dataSource.data.push({
          label: v.date + ' - ' + v.unit,
          value: v.cost
        })
      })


      console.log(resp.json())
    })
  }
}
