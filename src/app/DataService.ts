///<reference path="../../node_modules/rxjs/Observable.d.ts"/>
///<reference path="../../node_modules/@angular/http/src/http.d.ts"/>
///<reference path="../../node_modules/rxjs/add/operator/map.d.ts"/>
///<reference path="../../node_modules/@angular/http/src/base_request_options.d.ts"/>
import {Injectable} from '@angular/core';
import {Http, RequestOptions,Headers, Response, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import {Feature} from '@agm/core/services/google-maps-types';

@Injectable()
export class DataService {


  constructor(public http: Http) {

  }

  getuser() {
    return this.http.get('http://localhost:53723/api/user/Getusers').map((res: Response) => res.json());
  }

  saveuser(user) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(user);

    return this.http.post('http://localhost:49588/api/user/RegisterUser', body, options);


  }

  LoginUser(user) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(user);

    return this.http.post('http://localhost:49588/api/user/LoginUser', body, options);
  }

  GetUserData(user,) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(user);

    return this.http.post('http://localhost:49588/api/user/GetCurrentUser', body, options);


  }

  uploadimage(image) {
    let headers = new Headers();
    headers.set('Accept', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http.post('http://localhost:49588/api/profile/UploadFile', image, options)


  }

  updateuser(user) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(user);

    return this.http.post('http://localhost:49588/api/profile/EditUser', body, options);
  }

  getproduct() {

    return this.http.get('http://localhost:49588/api/product/GetProduct');
  }

  searchbyname(prod) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(prod);

    return this.http.post('http://localhost:49588/api/product/SearchByName', body, options);
  }

  geallcategories() {


    return this.http.get('http://localhost:49588/api/product/GetAllCategories');
  }

  searchByCategoryName(cat) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(cat);

    return this.http.post('http://localhost:49588/api/product/SearchByCategory', body, options);
  }

  getallcampanies() {


    return this.http.get('http://localhost:49588/api/product/GetAllCompanies');
  }

  searchByComopany(com) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(com);

    return this.http.post('http://localhost:49588/api/product/SearchByCompany', body, options);
  }

  GetProductData(pro) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(pro);

    return this.http.post('http://localhost:49588/api/product/GetCurrentProduct', body, options);


  }

  GetAllLike(like) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(like);

    return this.http.post('http://localhost:49588/api/product/GetAllLikes', body, options);
  }

  AddLikeOrDislike(like) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(like);

    return this.http.post('http://localhost:49588/api/product/LikeProduct', body, options);
  }

  DeleteLike(like) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(like);

    return this.http.post('http://localhost:49588/api/product/DeleteLikes', body, options);
  }

  GetAllComment(comment) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(comment);

    return this.http.post('http://localhost:49588/api/product/GetAllComment', body, options);
  }

  AddNewComment(comment) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(comment);

    return this.http.post('http://localhost:49588/api/product/CommentProduct', body, options);
  }
  DeleteComment(comment) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(comment);

    return this.http.post('http://localhost:49588/api/product/DeleteComment', body, options);
  }
  UpdateComment(comment) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(comment);

    return this.http.post('http://localhost:49588/api/product/EditComment', body, options);
  }
  GetRatingAvrege(rate) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(rate);

    return this.http.post('http://localhost:49588/api/product/RateAverage', body, options);
  }
  SaveRate(rate) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(rate);

    return this.http.post('http://localhost:49588/api/product/AddRate', body, options);
  }
  GetLocation(location) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(location);

    return this.http.post('http://localhost:49588/api/product/GetLocation', body, options);
  }
  getallproduct() {


    return this.http.get('http://localhost:49588/api/admin/GetAllProduct')



  }
  AddNewProduct(pr) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(pr);

    return this.http.post('http://localhost:49588/api/admin/AddNewProduct', body, options);
  }

  GetNumberOfPages()
  {
    return this.http.get('http://localhost:49588/api/admin/GetNumberOfPages');
  }
  GotoPage(pr) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(pr);

    return this.http.post('http://localhost:49588/api/admin/GotoPage', body, options);
  }
  uploadimageproduct(image) {
    let headers = new Headers();
    headers.set('Accept', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http.post('http://localhost:49588/api/admin/photoProduct', image, options)

  }
  DeleteProduct(pr) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(pr);

    return this.http.post('http://localhost:49588/api/admin/DeleteProduct', body, options);
  }

  EditProduct(pr) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(pr);

    return this.http.post('http://localhost:49588/api/admin/EditProduct', body, options);
  }

  report(pr) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(pr);

    return this.http.post('http://localhost:49588/api/report/reporting', body, options);
  }

}

