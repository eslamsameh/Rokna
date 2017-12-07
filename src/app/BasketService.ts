/**
 * Created by eslam on 8/28/2017.
 */
import {Injectable} from '@angular/core';
import {Http, RequestOptions,Headers, Response, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
@Injectable()
export class BasketService {
public  pro =[];
  saveinBasket(pro) {

if(this.pro.length > 0 ){
  for(var i=0;i<this.pro.length;i++)
  {
    if(this.pro[i].productid==pro.productid)
    {

    }
    else {
      this.pro.push(pro);

    }
  }

}
else {
  this.pro.push(pro);

}
  }
  getBasket() {
      return this.pro


  }
}
