/**
 * Created by eslam on 8/27/2017.
 */
import {Component, ElementRef, Input}from  '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Router, ActivatedRoute}from  '@angular/router';
import {DataService}from './DataService';
import {SignalRService}from './SignalRService';
import {OnInit} from '@angular/core'
import {productcomponent}from './productcomponent'
import {profileComponent}from './profileComponent'
import {UserCommentComponent}from './UserCommentComponent'
import {RatingModule} from 'ngx-rating';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'admin-comp',
  template: `


    <div class="col-md-3">
      <button (click)="AddProduct()">Add Product</button>
    </div>
    <div class="col-md-3">
      <button (click)="GetAllProduct()">Get All Products</button>

      <div *ngIf="showAddProduct">
        <label for="name" class="col-sm-3 control-label">name</label>
        <input type="text" [(ngModel)]="name"/>
        <label for="price" class="col-sm-3 control-label">price</label>
        <input type="text" [(ngModel)]="price"/>
        <label for="description" class="col-sm-3 control-label">description</label>
        <input type="text" [(ngModel)]="description"/>
        <label for="availability" class="col-sm-3 control-label">availability</label>
        <input type="text" [(ngModel)]="availability"/>
        <img src={{imgUrl}} style="width: 150px
      ;
        height: 150px
        " id="Photo" />

        <div class="col-lg-2">
          <input class="btn btn-primary" id="PhotoUpload" type="file" (change)="uploadPhoto($event)"/>
          <br/>


          <div class="autocomplete-filter-section">
            <input type="text" [(ngModel)]="companyname" (keyup)=filter($event)>
            <label for="country">Company</label>
          </div>
          <div class="suggestions" *ngIf="filteredItemscompany.length > 0">
            <div *ngFor="let item of filteredItemscompany">
              <div>
                <a (click)="selectcompany(item)">{{item}}</a>
              </div>
            </div>
          </div>


          <div class="autocomplete-filter-section">
            <input type="text" [(ngModel)]="categoryname" (keyup)=filtercategory($event)>
            <label for="country">category</label>
          </div>
          <div class="suggestions" *ngIf="filteredItemscategory.length > 0">
            <div *ngFor="let item of filteredItemscategory">
              <div>
                <a (click)="selectcategory(item)">{{item}}</a>
              </div>
            </div>
          </div>


          <button (click)="saveAddProduct()"> save product</button>
        </div>
      </div>

      <div *ngFor="let getproduct of getproducts">

        <li>{{getproduct.name}}</li>
        <li>{{getproduct.price}}</li>
        <li>{{getproduct.description || "mfesh description"}}</li>
        <li>{{getproduct.availability}}</li>
        <li>category : {{getproduct.category.name}}</li>
        <li>company : {{getproduct.company.name}}</li>
        <img src={{getproduct.photo}} style="width: 150px
      ;
        height: 150px
        " id="Photo" />
        <product-comp [DataSource]="getproduct" [Categories]="categories" [Companies]="companies" (Reload)="ReloadProduct($event)"></product-comp>

        ----------------------------------

      </div>

      <div *ngFor="let page of NumberOfPages">
        <button (click)="GotoPage(page)">{{page}}</button>
      </div>

    </div>
 
  `,
})
export class adminComponent implements OnInit {
  public imgUrl: any;
  public filteredItemscategory = [];
  public filteredItemscompany = [];
  public elementRef;
  product: {};
  showAddProduct = false;
  public x: any;
  public getproducts: any;
  name: '';
  price: number;
  description: '';
  category: any;
  availability: '';
  company: any;
  companies: any;
  public companiesNames = [];
  public companyname: any;
  public categoryname: any;
  categories: any;
  public categoriesNames: any = [];
  public NumberOfPages: any = [];
  public formDataVar: any;

  public imageFile: any;

  constructor(public datasrv: DataService, public router: Router, public Activatedroute: ActivatedRoute, public myelment: ElementRef,public signalR: SignalRService) {
  }


  ngOnInit() {

    this.signalR.resolve().then((connection) => {
      let onMessageSent$  = connection.listenFor('recieveMessage');
      onMessageSent$.subscribe((msg:any)=>{
        alert(msg);
        console.log(msg);
      })
    })


    this.datasrv.getallcampanies().subscribe(resp => {
      console.log(resp.json().company);
      this.companies = resp.json().company
      this.companies.map((value, index) => {
        this.companiesNames.push(value.name.replace(/ /g, ''));
      })
    })
    this.datasrv.geallcategories().subscribe(resp => {
      this.categories = resp.json().category;
      this.categories.map((value, index) => {
        this.categoriesNames.push(value.name.replace(/ /g, ''))
      })
    })
  }

  GetAllProduct() {
    this.NumberOfPages = [];

    this.datasrv.getallproduct().subscribe((resp) => {

      this.getproducts = resp.json().products;

      let data = resp.json();

      this.getproducts.map((val, index) => {

        if (val.photo != null) {


          let photoOriginalURL = val.photo;

          let splittedURL = photoOriginalURL.split('roknty');

          val.photo = 'http://localhost:49588' + splittedURL[2];
        }

      })


      this.datasrv.GetNumberOfPages().subscribe((resp) => {
        let response = resp.json().NumberOfPages;
        for (let x = 1; x <= response; x++) {
          this.NumberOfPages.push(x);
        }
      })

    })


  }

  AddProduct() {
    this.showAddProduct = true;
  }

  saveAddProduct() {
    let companyid: any;
    let categoryid: any;
    if ((this.categoryname != undefined) && (this.companyname != undefined)) {


      this.companies.map((v, i) => {
        let companyname = this.companyname.replace(/ /g, '');
        v.name = v.name.replace(/ /g, '');
        if (v.name === companyname) {
          companyid = v.companyid;
        }


      })
      this.categories.map((v, index) => {
        let categoryname = this.categoryname.replace(/ /g, '');
        v.name = v.name.replace(/ /g, '');
        if (v.name === categoryname) {
          categoryid = v.categoryid
        }

      })

      let indexofcompany = this.companies.findIndex(x=>x.name===this.companyname);
      let indexofcategory = this.categories.findIndex(x=>x.name===this.categoryname);

      if(indexofcategory>-1 && indexofcompany >-1) {


        this.product = {
          name: this.name,
          price: this.price,
          description: this.description,
          availability: this.availability,
          categoryid: categoryid,
          companyid: companyid,
          photo: this.imgUrl

        }

        this.datasrv.AddNewProduct(this.product).subscribe((resp) => {

          console.log(resp.json());

          alert('add success');


          this.uploadImageInsideProduct(this.imageFile, resp.json().productid);

        })
        this.showAddProduct = false;
      }
      else {
        alert("blash habal ya ws5")
      }
    }
    else {
      alert('d5al el data 3del bdal ma az3lk')
    }
  }


  filtercategory(event) {
    let s = event.target.value;
    if (this.categoryname !== '') {

      this.filteredItemscategory = this.categoriesNames.filter(function (e) {

        return (e.toLowerCase().substr(0, this.categoryname.length) ==

          this.categoryname.toLowerCase()) == true;
      }.bind(this));

    }
    else {
      this.filteredItemscategory = [];
    }


  }

  GotoPage(page) {
    this.datasrv.GotoPage({Pagenumber: page - 1}).subscribe((resp) => {
      let response = resp.json().data;
      debugger;
      this.getproducts = response;

      this.getproducts.map((val, index) => {

        if (val.photo != null) {

          let photoOriginalURL = val.photo;

          let splittedURL = photoOriginalURL.split('roknty');

          val.photo = 'http://localhost:49588' + splittedURL[2];
        }

      })

    })
  }

  filter(event) {
    let e = event.target.value;
    if (this.companyname !== '') {

      this.filteredItemscompany = this.companiesNames.filter(function (e) {

        return (e.toLowerCase().substr(0, this.companyname.length) ==

          this.companyname.toLowerCase()) == true;
      }.bind(this));

    }
    else {
      this.filteredItemscompany = [];
    }
  }

  selectcompany(item) {
    this.companyname = item;
    this.filteredItemscompany = [];
  }

  selectcategory(item) {
    this.categoryname = item;
    this.filteredItemscategory = [];
  }

  uploadPhoto(image) {
    this.imageFile = image;
  }

  uploadImageInsideProduct(image, productid) {


    var file = image.target.files[0];
    var r = new FileReader();
    r.onloadend = (e: any) => {

      var arr = Array.from(new Uint8Array(e.target.result));

      var uploadData = {
        Id: productid,
        Bytes: arr
      }
      console.log(uploadData);


      this.datasrv.uploadimageproduct(uploadData).subscribe((resp) => {
        debugger;
        console.log(resp.json());

      })
      }
    r.readAsArrayBuffer(file);






  }
  ReloadProduct(data){
this.GetAllProduct();
  }

}



