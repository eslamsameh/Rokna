/**
 * Created by eslam on 8/28/2017.
 */
import {Component, ElementRef, Input, ViewChild}from  '@angular/core';
import {Router, ActivatedRoute}from  '@angular/router';
import {DataService}from './DataService';
import {BasketService}from './BasketService';
import {OnInit} from '@angular/core'
import {Http, Response} from '@angular/http';
import {NguiMessagePopupComponent, NguiPopupComponent, NguiPopupModule} from '@ngui/popup';
import {detailscomponent} from './DetailComponent';

@Component({
  selector: 'purches-comp',
  template: `
    <div>

      <ngui-popup #popup></ngui-popup>
      <button (click)="openPopup()">Buy</button>

      <input type="text" (input)="GetUnit($event)"/>
      <button (click)="BuyProduct()"> BuyProduct</button>
      <h4>{{priceWithunit}}</h4>
    </div>



  `,

})
export class purchescomponent implements OnInit {
  @ViewChild(NguiPopupComponent) popup: NguiPopupComponent;
  @Input() userid: any;
  @Input() productid: any;
  @Input() price: any;
  public unit: any = 1;
  public date = new Date();
  product: any;


  public priceWithunit: any = this.price;

  constructor(public datasrv: DataService, public router: Router, public Activatedroute: ActivatedRoute, public baset: BasketService,) {


  }

  ngOnInit() {
    sessionStorage.setItem("productid",this.productid);
  }

  BuyProduct() {
    this.product = {
      userid: this.userid,
      productid: this.productid,
      unit: this.unit,
      cost: this.priceWithunit,
      date: this.date
    }
    this.baset.saveinBasket(this.product);

  }

  GetUnit(event) {
    console.log(event.target.value);
    this.unit = event.target.value;
    this.priceWithunit = this.price * this.unit;
    if (this.unit === '') {
      this.priceWithunit = this.price;
    }

  }


  openPopup() {
    let mybasketData = this.baset.getBasket();
    let stringData = '';
    for (let x = 0; x < mybasketData.length; x++) {
      debugger;

stringData+=mybasketData[x].cost + " , "
    }

    this.popup.open(NguiMessagePopupComponent, {
      title: 'purchaces',
      message: stringData
    })

    // your other array...


  }
}











