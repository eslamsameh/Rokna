

import {Component, ElementRef, EventEmitter, Input, Output, ViewChild}from  '@angular/core';
import {Router, ActivatedRoute}from  '@angular/router';
import {DataService}from './DataService';
import {BasketService}from './BasketService';
import {OnInit} from '@angular/core'
import {Http, Response} from '@angular/http';
import {adminComponent}from './adminComponent'
import {JQueryStyleEventEmitter} from 'rxjs/observable/FromEventObservable';
@Component ({
  selector: 'product-comp',
  template:`
  <div>
    <div>
     
      <button (click)="deleteproduct(DataSource.productid)">delete</button>
      <div>
        <button (click)="ShowEditProduct()">Show Edit Poroduct</button>
        <div *ngIf="showEdit">
         
          <input type="text" [(ngModel)]="DataSource.name" />
          <input type="text" [(ngModel)]="DataSource.price" />
          <input type="text" [(ngModel)]="DataSource.availability" />
          <input type="text" [(ngModel)]="DataSource.description" />
          <input type="text" [(ngModel)]="DataSource.category.name" />
          <input type="text" [(ngModel)]="DataSource.company.name" />
          <img src={{DataSource.photo}} style="width: 150px
        ;
          height: 150px
          " id="Photo" />
        <div class="col-lg-2">
          <input class="btn btn-primary" id="PhotoUpload" type="file" (change)="uploadPhoto($event)"/>
          <br/>
       
          <button (click)="saveData(DataSource.productid)">save</button>
          
        </div>
      </div>
    </div>
  </div>
  `
})

export class productcomponent {
  @Input() DataSource: any;
  @Output() Reload = new EventEmitter();
  @Input() Categories:any;
  @Input() Companies:any;
  showEdit: boolean = false;
  imageFile: any;

  constructor(public router: Router, public ds: DataService, public el: ElementRef, private http: Http) {

  }

  deleteproduct(productid) {

    this.ds.DeleteProduct({productid: productid}).subscribe(resp => {
      let data = resp.json().product;
      this.Reload.emit("reload")
      debugger;
    })
  }

  ShowEditProduct() {
    this.showEdit = true;
  }

  saveData(productid) {

    let indexofcompany = this.Companies.findIndex(x=>x.name.replace(/ /g,"")===this.DataSource.company.name.replace(/ /g,""));
    let indexofcategory = this.Categories.findIndex(x=>x.name.replace(/ /g,"")===this.DataSource.category.name.replace(/ /g,""));
debugger;
    if(indexofcategory>-1&&indexofcompany>-1)
    {



let product={
  productid:productid,
  name:this.DataSource.name,
  price:this.DataSource.price,
  availability:this.DataSource.availability,
  description:this.DataSource.description,
  categoryid:this.Categories[indexofcategory].categoryid,
  companyid:this.Companies[indexofcompany].companyid,

    }


    this.ds.EditProduct(product).subscribe(resp => {
      let data = resp.json().product;
      this.uploadImageInsideProduct(this.imageFile, productid);
    })
    }

    else {alert("shiiiiiit")}
  }

  uploadPhoto(image) {
    this.imageFile = image;
  }

  uploadImageInsideProduct(image, productid) {

    var file = image.target.files[0];
    let r = new FileReader();
    r.onloadend = (e: any) => {


      var arr = Array.from(new Uint8Array(e.target.result));

      var uploadData = {
        Id: productid,
        Bytes: arr
      }
      console.log(uploadData);

      this.ds.uploadimageproduct(uploadData).subscribe((resp) => {
        console.log(resp.json());
        debugger;

      })
    }
    r.readAsArrayBuffer(file);

  }


}
