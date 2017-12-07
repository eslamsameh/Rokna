/**
 * Created by eslam on 8/20/2017.
 */
import {Component, ElementRef, Input}from  '@angular/core';
import {Router, ActivatedRoute}from  '@angular/router';
import {DataService}from './DataService';
import {OnInit} from '@angular/core'
import {Http, Response} from '@angular/http';
import {profileComponent}from './profileComponent'
import {UserCommentComponent}from './UserCommentComponent'
import {purchescomponent}from './purchescomponent'
import {RatingModule} from "ngx-rating";
import {BasketService}from './BasketService'
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

@Component({

  selector: 'detail-comp',
  styleUrls:['./rating.css'],
  template: `
    <div>
      <br class="container">
      <div class="col-lg-1"></div>
      <div class="col-lg-10">
        <button class="btn btn-danger" (click)="logout()">Logout</button>
        <li class="col-1g-4" class="result-message">user : {{myname}}</li>


        <img [src]="myphoto" style="width: 50px;
      height: 50px;
      " id="Photo"/>

        <div>
          <ul class="container">

            <li class="list-group-item list-group-item-success">Product Name : {{name}}</li>
            <li class="list-group-item list-group-item-warning">Product Price : {{price}}</li>
            <span> photo product </span>
            <img src={{photo}} style="width: 150px
          ;
            height: 150px
            " id="Photo" />
            <li class="list-group-item list-group-item-warning">Description : {{description}}</li>
            <li class="list-group-item list-group-item-warning">Availability : {{availability}}</li>
            <li class="list-group-item list-group-item-warning">Category : {{category}}</li>
            <li class="list-group-item list-group-item-danger">Company : {{company}}</li>
            <li class="list-group-item list-group-item-danger">Company Address : {{address}}</li>

            <agm-map  [latitude]="lat" [longitude]="lng" [zoom]="12">
              <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
            </agm-map>
            <div class="">
              <rating [(ngModel)]="MyRating"
                      
                      [max]="5"
                      iconClass="fa-star"
                      fullIcon="★"
                      emptyIcon="☆"
                      [readonly]="false"
                      [disabled]="false"
                      [required]="true"
                      [float]="true"
                      [titles]="['one', 'two', 'three', 'four', 'five']">
               
              </rating>
              rating : {{MyRating}}
              <button (click)="saveRating()">Save Rating</button>
            </div>
            <li class="list-group-item list-group-item-danger">user likes : {{likee}}
              <div *ngFor="let nameUser of arrayofLikedNames">
                <h5>{{nameUser}}</h5>
              </div>
            </li>
            <li class="list-group-item list-group-item-danger">user dislikes : {{dislike}}
              <div *ngFor="let nameUser of arrayODislikedNames">
                <h5>{{nameUser}}</h5>
              </div>
            </li>

            <li class="list-group-item list-group-item-danger"> comments count : {{commentesCount}}
              <div>

                <div *ngFor="let item of usersAndComments">
                  <user-comment [DataSource]="item" (eventEmitter)="reloadPage($event)" ></user-comment>
                  
                  
            <!--      user : {{item.user}} &#45;&#45; comment : {{item.comment}}
                  <button (click)="deletecomment(item.id)">delete</button>
                  <button (click)="ShowEditComment()" *ngIf="showEdit">Show Edit Comment</button>
                  <input type="text" placeholder="Edit Text" *ngIf="EditText" />
                  <button (click)="saveUpdate(item.id)" *ngIf="showSaveButton" >save</button>-->
                  
                </div>

              </div>


              <textarea [(ngModel)]="input">Your Comment </textarea>
              <button (click)="savecomment(input)">Seve</button>

              <button class="col-lg-1" class="btn btn-danger" (click)="Back()">Profile</button>

              <span>
          
        <button class="col-lg-4" class="btn btn-danger" (click)="home()">Home</button>
        </span>
              <button (click)="addlike()">Like</button>
              <button (click)="addDislike()">DisLike</button>
              <purches-comp  [productid]="productid" [userid]="userid" [price]="price" ></purches-comp>

  `,

})
export class detailscomponent implements OnInit {
  userid:any;
  public lat=30.54154;
  public lng=30.4444;
  address:any;
  public MyRating:any;
  public delete: any;
  public input: any;
  public contain: any;
  public commentesCount: any;
  public likee: any;
  public dislike: any;
  myname: string;
  productid: any;
  dataproduct: any;
  name: '';
 public price: number;
  description: '';
  availability: any;
  category: '';
  company: '';
  photo: any;
  myphoto: any;
  arrayofLikedNames = [];
  arrayODislikedNames = [];
  public clickLikeCount = 0;
  public clickdislikCount = 0;
  arrayofCommentedNames = [];
  originalComments = [];
  usersAndComments = [];
  showEdit=true;
  showSaveButton=false;
  EditText=false;
  constructor(public datasrv: DataService, public router: Router, public Activatedroute: ActivatedRoute ,public bastket:BasketService) {

  }
  ShowEditComment(){
    this.showSaveButton=true;
    this.EditText=true;
    this.showEdit=false;
  }

  deletecomment(id)
  {
    let userid = sessionStorage.getItem('id');
    this.datasrv.DeleteComment({ userid:userid, productid: this.productid, usercommentid:id}).subscribe((resp)=>{

let data=resp.json().comment;


    })
  }

  reloadPage(word)
  {
    if(word==="delete")
    {
      this.originalComments=[];
      this.arrayofCommentedNames=[];
      this.usersAndComments=[];
      let arrayofComments = [];
      let arrayOfCommentedUser = [];
      let originalcomments = [];
      let originalcommentsIds = []
      this.datasrv.GetAllComment({productid: this.productid}).subscribe((resp => {
        let data = resp.json().comments;
        let users = resp.json().users;

        if(data&&users) {

          if (data && users) {

            for (let z = 0; z < data.length; z++) {
              if (data[z].comment.indexOf('') > -1) {

                arrayOfCommentedUser.push(users[z].firstname);
                originalcomments.push(data[z].comment);
                originalcommentsIds.push(data[z].usercommentid);

              }
            }
            this.commentesCount = arrayofComments.length;
            this.originalComments = originalcomments;
            this.arrayofCommentedNames = arrayOfCommentedUser;

            this.usersAndComments = [];

            for (let x = 0; x < this.originalComments.length; x++) {
              this.usersAndComments.push({
                comment: this.originalComments[x],
                user: this.arrayofCommentedNames[x],
                id: originalcommentsIds[x]
              });
            }

          }
        }
        else {
          this.usersAndComments=[];
          this.commentesCount=0;
        }
      }))

    }
  }

  saveUpdate(id)
  {
this.showSaveButton=false;
this.showEdit=true;
this.EditText=false;
  }

  ngOnInit() {
    let data = this.bastket.getBasket();
    this.userid=sessionStorage.getItem('id');
    let name = sessionStorage.getItem('name');
    this.myphoto = sessionStorage.getItem('myphoto');
    this.myname = sessionStorage.getItem('name');

    let arrayofLikes = [];
    let arrayOfLikedUsers = [];
    let arrayofDislikes = []
    let arrayOfDislikedUsers = []
    let arrayofComments = [];
    let arrayOfCommentedUser = [];

    this.productid = this.Activatedroute.snapshot.params['id']


    this.datasrv.GetAllLike({productid: this.productid}).subscribe((resp => {

      let data = resp.json().likes;
      let users = resp.json().users;

      if (data && users) {

        for (let x = 0; x < data.length; x++) {
          if (data[x].status == true) {

            arrayofLikes.push(data[x]);
            arrayOfLikedUsers.push(users[x].firstname);

          }
          else {
            arrayofDislikes.push(data[x]);
            arrayOfDislikedUsers.push(users[x].firstname);

          }
        }
        this.likee = arrayofLikes.length;
        this.dislike = arrayofDislikes.length
        this.arrayofLikedNames = arrayOfLikedUsers;
        this.arrayODislikedNames = arrayOfDislikedUsers;
      }
      else {
        this.likee = '';
        this.dislike = ''
        this.arrayofLikedNames = [];
        this.arrayODislikedNames = [];
      }


    }))


    if (name) {
      this.datasrv.GetProductData({productid: this.productid}).subscribe((resp => {

          let data = resp.json().productData;
          this.name = data.name;
          this.price = data.price;
          this.company = data.company.name;
          this.category = data.category.name;
          this.address=data.company.address;




          let photoOriginalURL = data.photo;
          let splittedURL = photoOriginalURL.split('roknty');
          this.photo = 'http://localhost:49588' + splittedURL[2];

          debugger;
          if (data.availability === true) {
            this.availability = 'this product is available'
          }
          else {
            this.availability = 'out of stock'
          }
        }
      ))

    }
    else {
      this.router.navigateByUrl('login');
    }

    let originalcomments = [];
    let originalcommentsIds = []
    this.datasrv.GetAllComment({productid: this.productid}).subscribe((resp => {
      let data = resp.json().comments;
      let users = resp.json().users;

      if (data && users) {

        for (let z = 0; z < data.length; z++) {
          if (data[z].comment.indexOf('') > -1) {

            arrayofComments.push(data[z]);
            arrayOfCommentedUser.push(users[z].firstname);
            originalcomments.push(data[z].comment);
            originalcommentsIds.push(data[z].usercommentid);

          }
        }
        this.commentesCount = arrayofComments.length;
        this.originalComments = originalcomments;
        this.arrayofCommentedNames = arrayOfCommentedUser;

        this.usersAndComments = [];

        for (let x = 0; x < this.originalComments.length; x++) {
          this.usersAndComments.push({comment: this.originalComments[x], user: this.arrayofCommentedNames[x],id:originalcommentsIds[x]});
        }

      }
    }))
   let companyid= this.Activatedroute.snapshot.params['companyid'];


    this.datasrv.GetRatingAvrege({companyid:companyid}).subscribe((resp=>{
let data=resp.json().avg;
this.MyRating=data.toFixed(1);

}))
    this.datasrv.GetLocation({companyid:companyid}).subscribe((resp=>{
      let data=resp.json().map;
      this.lat=data[0].lout;
      this.lng=data[0].long;

    }))

  }

  logout() {
    sessionStorage.setItem('name', '');
    this.router.navigateByUrl('login');
  }

  Back() {
    this.router.navigateByUrl('profile')
  }

  home() {
    this.router.navigateByUrl('Home')
  }

  addlike() {
    this.clickLikeCount = this.clickLikeCount + 1;
    let userid = sessionStorage.getItem('id');

    if (this.clickLikeCount == 1) {
      this.clickdislikCount = 0;

      this.datasrv.AddLikeOrDislike({productid: this.productid, userid: userid, status: true}).subscribe((resp => {

        let data = resp.json().like


        let arrayofLikes = [];
        let arrayOfLikedUsers = [];
        let arrayofDislikes = []
        let arrayOfDislikedUsers = []
        this.productid = this.Activatedroute.snapshot.params['id']
        this.datasrv.GetAllLike({productid: this.productid}).subscribe((resp => {

          let data = resp.json().likes;
          let users = resp.json().users;


          for (let x = 0; x < data.length; x++) {
            if (data[x].status == true) {

              arrayofLikes.push(data[x]);
              arrayOfLikedUsers.push(users[x].firstname);

            }
            else {
              arrayofDislikes.push(data[x]);
              arrayOfDislikedUsers.push(users[x].firstname);

            }
          }
          this.likee = arrayofLikes.length;
          this.dislike = arrayofDislikes.length
          this.arrayofLikedNames = arrayOfLikedUsers;
          this.arrayODislikedNames = arrayOfDislikedUsers;


        }))


      }))

    }
    else if (this.clickLikeCount == 2) {
      //delete
      this.datasrv.DeleteLike({productid: this.productid, userid: userid}).subscribe((resp) => {
        let arrayofLikes = [];
        let arrayOfLikedUsers = [];
        let arrayofDislikes = []
        let arrayOfDislikedUsers = []
        this.productid = this.Activatedroute.snapshot.params['id']
        this.datasrv.GetAllLike({productid: this.productid}).subscribe((resp => {

          let data = resp.json().likes;
          let users = resp.json().users;

          if (data && users) {
            for (let x = 0; x < data.length; x++) {
              if (data[x].status == true) {

                arrayofLikes.push(data[x]);
                arrayOfLikedUsers.push(users[x].firstname);

              }
              else {
                arrayofDislikes.push(data[x]);
                arrayOfDislikedUsers.push(users[x].firstname);

              }
            }

            this.likee = arrayofLikes.length;
            this.dislike = arrayofDislikes.length
            this.arrayofLikedNames = arrayOfLikedUsers;
            this.arrayODislikedNames = arrayOfDislikedUsers;
          }
          else {
            this.likee = 'no likes';
            this.dislike = 'no dislike'

            this.arrayofLikedNames = [];
            this.arrayODislikedNames = [];
          }


        }))

      })
      this.clickdislikCount = 0;
      this.clickLikeCount = 0;
    }

  }

  addDislike() {
    this.clickdislikCount = this.clickdislikCount + 1;
    let userid = sessionStorage.getItem('id');

    if (this.clickdislikCount == 1) {
      this.clickLikeCount = 0;

      this.datasrv.AddLikeOrDislike({productid: this.productid, userid: userid, status: false}).subscribe((resp => {

        let data = resp.json().like


        let arrayofLikes = [];
        let arrayOfLikedUsers = [];
        let arrayofDislikes = []
        let arrayOfDislikedUsers = []
        this.productid = this.Activatedroute.snapshot.params['id']
        this.datasrv.GetAllLike({productid: this.productid}).subscribe((resp => {

          let data = resp.json().likes;
          let users = resp.json().users;


          for (let x = 0; x < data.length; x++) {
            if (data[x].status == true) {

              arrayofLikes.push(data[x]);
              arrayOfLikedUsers.push(users[x].firstname);

            }
            else {
              arrayofDislikes.push(data[x]);
              arrayOfDislikedUsers.push(users[x].firstname);

            }
          }
          this.likee = arrayofLikes.length;
          this.dislike = arrayofDislikes.length
          this.arrayofLikedNames = arrayOfLikedUsers;
          this.arrayODislikedNames = arrayOfDislikedUsers;


        }))


      }))

    }
    else if (this.clickdislikCount == 2) {
      //delete
      this.datasrv.DeleteLike({productid: this.productid, userid: userid}).subscribe((resp) => {
        let arrayofLikes = [];
        let arrayOfLikedUsers = [];
        let arrayofDislikes = []
        let arrayOfDislikedUsers = []
        this.productid = this.Activatedroute.snapshot.params['id']
        this.datasrv.GetAllLike({productid: this.productid}).subscribe((resp => {

          let data = resp.json().likes;
          let users = resp.json().users;

          if (data && users) {
            for (let x = 0; x < data.length; x++) {
              if (data[x].status == true) {

                arrayofLikes.push(data[x]);
                arrayOfLikedUsers.push(users[x].firstname);

              }
              else {
                arrayofDislikes.push(data[x]);
                arrayOfDislikedUsers.push(users[x].firstname);

              }
            }

            this.likee = arrayofLikes.length;
            this.dislike = arrayofDislikes.length
            this.arrayofLikedNames = arrayOfLikedUsers;
            this.arrayODislikedNames = arrayOfDislikedUsers;
          }
          else {
            this.likee = 'no likes';
            this.dislike = 'no dislike'

            this.arrayofLikedNames = [];
            this.arrayODislikedNames = [];
          }


        }))

      })
      this.clickdislikCount = 0;
      this.clickLikeCount = 0;
    }

  }

  savecomment(val) {


    let userid = sessionStorage.getItem('id');
    this.datasrv.AddNewComment({productid: this.productid, userid: userid, comment: this.input}).subscribe((resp) => {

      let data = resp.json().commente


      this.productid = this.Activatedroute.snapshot.params['id']
 /*
      this.datasrv.GetAllComment({productid: this.productid}).subscribe((resp => {
        let data = resp.json().comments;
        let users = resp.json().users;

        if (data && users) {
          let arrayofComments = [];
          let arrayOfCommentedUser = [];
          for (let z = 0; z < data.length; z++) {
            if (data[z].comment.indexOf('') > -1) {

              arrayofComments.push(data[z]);
              arrayOfCommentedUser.push(users[z].firstname);
              let x = arrayOfCommentedUser.push(data[z].comment);
            }
          }

          this.commentesCount = arrayofComments.length;
          this.originalComments = arrayofComments;
          this.arrayofCommentedNames = arrayOfCommentedUser;


        }
      }))
*/
this.reloadPage("delete");
    })

    this.input = '';

  }
  saveRating(){
    let userid = sessionStorage.getItem('id');
    let companyid= this.Activatedroute.snapshot.params['companyid'];
this.datasrv.SaveRate({companyid:companyid,userid:userid,rate:this.MyRating}).subscribe((resp=>{

let data=resp.json().like;

  this.datasrv.GetRatingAvrege({companyid:companyid}).subscribe((resp=>{
    let data=resp.json().avg;
    this.MyRating=data.toFixed(1);

  }))

}))
  }

}
















