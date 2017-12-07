/**
 * Created by eslam on 8/19/2017.
 */
import {Component, ElementRef, Input}from  '@angular/core';
import {Router}from  '@angular/router';
import {DataService}from './DataService';
import {BasketService}from './BasketService';
import {OnInit} from '@angular/core'
import {Http, Response} from '@angular/http';
import {profileComponent}from './profileComponent'

import 'rxjs/add/operator/map'
import 'rxjs/Rx';
@Component({

  selector: 'home-app',
  template: `
    <div class="container">
      <div class="col-lg-6"></div>
      <div class="col-lg-4">
        <button class="btn btn-danger"  (click)="Profile()">Profile</button>

      </div>
      <li >user:{{firstname}}</li>
      <img [src]="myphoto" style="width: 50px;
      height: 50px;
      " id="Photo"/>

      <input type="text" [(ngModel)]="productName" value="search"/>
      <button (click)="searchByName()">Search</button>
      <select (change)="selectCategory($event)">
        <option>Select category</option>
        <option *ngFor="let category of categories"> {{category.name}}</option>
      </select>
      <select (change)="selectCompany($event)">
        <option>Select Companies</option>
        <option *ngFor="let company of companies"> {{company.name}}</option>
      </select>

      <table class="table table-bordered">
        <tr>
          <td>name</td>
          <td>price</td>
          <td>details</td>
        </tr>
        <tr *ngFor="let item of dataproduct">
          <td><h3>{{item.name}}</h3>
          </td>
          <td><h3>{{item.price}}</h3>
            <img src={{item.photo}} style="width: 150px
            ;
              height: 150px
            " id="Photo" />
          </td>
          <td><a routerLink="/Detail/{{item.productid}}/{{item.companyid}}" style="font-size: large" class="row" Class="col-lg-4">{{item.details}}Details</a>
          </td>
        </tr>
      </table>
      

    <div class="col-lg-6"></div>
    <div class="col-lg-4">
      <button class="btn btn-danger"  (click)="logout()">Logout</button>

    </div>

  `,



})
export class homecomponent implements OnInit {

  firstname:string;
  public myphoto: any = '';
  public items: any;
  name: string;
  price: any;
  img: any;
  description: any;
  availability: any;
  public productName = '';
  public categories = [];
  public dataproduct = [];
public photo:any;
  public companies = [];

  constructor(public DATASERVICE: DataService, public route: Router,public basket : BasketService) {


  }

  ngOnInit() {

    let data =console.log(this.basket.getBasket()) ;


    let name = sessionStorage.getItem('name');

    this.myphoto = sessionStorage.getItem('myphoto');
    this.firstname = sessionStorage.getItem('name');

    if (name) {



      this.getallcompanies();
      this.getallcategories();
      let productData = this.DATASERVICE.getproduct().subscribe((response) => {
        this.dataproduct = response.json().products;
        let data = response.json();

        this.dataproduct.map((val, index) => {

          if (val.photo != null) {
           

            let photoOriginalURL = val.photo;

            let splittedURL = photoOriginalURL.split('roknty');

            val.photo = 'http://localhost:49588' + splittedURL[2];


          }

        })
      })


    }
    else {
      this.route.navigateByUrl('login');
    }


  }


  searchByName() {

    this.DATASERVICE.searchbyname({name: this.productName}).subscribe((resp) => {

      this.dataproduct = resp.json().products;
    })
  }

  getallcategories() {
    this.DATASERVICE.geallcategories().subscribe((resp) => {
      this.categories = resp.json().category;
    })
  }

  selectCategory(event) {

    let choosenCategory = event.target.value;
    this.DATASERVICE.searchByCategoryName({name: choosenCategory}).subscribe((resp) => {
      console.log(resp.json().category);
      this.dataproduct = resp.json().category[0].products;

    })


  }

  getallcompanies() {
    this.DATASERVICE.getallcampanies().subscribe((resp) => {
      this.companies = resp.json().company;
    })
  }

  selectCompany(event) {

    let chossenCompany = event.target.value;
    this.DATASERVICE.searchByComopany({name: chossenCompany}).subscribe((resp) => {

      let data= resp.json().company[0].products;
      this.dataproduct=data;
    })


  }

  logout(){
    sessionStorage.setItem('name', '');
    this.route.navigateByUrl('login');
  }
  Profile(){
    this.route.navigateByUrl('profile')
  }
}
