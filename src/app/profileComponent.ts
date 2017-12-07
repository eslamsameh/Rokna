/**
 * Created by eslam on 8/13/2017.
 */
import {Component, ElementRef}from  '@angular/core';
import {Router}from  '@angular/router';
import {DataService}from './DataService';
import {OnInit} from '@angular/core'
import {Http, Response} from '@angular/http';
import {homecomponent}from'./HomeCompanent'
function swal(s: string, s2: string, s3: string) {

}
@Component({
  template: `
    <div class="container">
      
      <div class="row">
        <div class="col-lg-2">
          <img  class="img-circle" src={{imgUrl}} style="width: 150px;
          height: 150px
          " id="Photo" />
        </div>
        <div class="col-lg-2">
          <input class="btn btn-primary" type="file" (change)="uploadImageInsideComponent($event)"/>
        <br/>

          <input class="btn btn-default"  type="button" value="Upload Photo" (click)="a3rdelsora()" (change)="uploadImageInsideComponent($event)"/>

        </div>
        <div class="col-lg-6"></div>
        <div class="col-lg-2">
          <button class="btn btn-danger"  (click)="logout()">Logout</button>

        </div>
      </div>
     
      
      <br/>
       
      <div class="row">
        
 
      <ul class="list-group">
        <li class="list-group-item list-group-item-success">first name : {{firstname}}</li>
        <li class="list-group-item list-group-item-info">last name : {{lastname}}</li>
        <li class="list-group-item list-group-item-warning">phone : {{phone}}</li>
        <li class="list-group-item list-group-item-danger">age : {{age}}</li>
      </ul>

      <div id="divForImage">

      </div>
      <input class="btn btn-success" type="button" value="show edit" (click)="showedit()"/>
      <div *ngIf="showupdate">
        <input type="text" [(ngModel)]="firstname" value="First Name"/>
        <input type="text" [(ngModel)]="lastname" value="Last Name"/>
        <input type="text" [(ngModel)]="age" value="Age"/>
        <input type="text" [(ngModel)]="phone" value=" Phone"/>
        
        <button class="btn btn-info" (click)="updateuser()">Update User</button>
      </div>
      </div>
    </div>
      <div>
        <div class="col-lg-6"></div>
        <div class="col-lg-3">
          <a routerLink="/Home" style="font-size: large" class="btn-success">Home</a>
        </div>
    
    
    
  `,

})

export class profileComponent implements OnInit {

  public showupdate = false;
  public firstname = '';
  public lastname = '';
  public phone = '';
  public age = '';
  public imgUrl: any = 'http://localhost:49588';
  public formDataVar: any = '';

  constructor(public router: Router, public ds: DataService, public el: ElementRef, private http: Http) {

  }

  ngOnInit() {
    let name = sessionStorage.getItem('name');
    if (name) {

      this.ds.GetUserData({firstname: name}).subscribe((response) => {
        let data = response.json().userData;

        console.log(data)
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.age = data.age;
        this.phone = data.phone;



          let indexOfLastImage = data.profiles.length - 1
          let photoOriginalURL = data.profiles[indexOfLastImage].photo;
          let splittedURL = photoOriginalURL.split('roknty');
          this.imgUrl = this.imgUrl + splittedURL[2];

          sessionStorage.setItem("myphoto",this.imgUrl);
        sessionStorage.setItem("myname",this.firstname);




      })


    }
    else {
      this.router.navigateByUrl('login')
    }
  }

  logout() {
    sessionStorage.setItem('name', '');
    this.router.navigateByUrl('login');
  }


  uploadImageInsideComponent(image) {


    this.imgUrl = image.target.files;

    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.imgUrl = e.target.result;

    }
    reader.readAsDataURL(image.target.files[0]);

    let files = image.target.files;
    if (files.length > 0) {
      let formData: FormData = new FormData();

      for (let file of files) {
        formData.append('files', file, file.name);
        this.formDataVar = formData;
      }
      let id = sessionStorage.getItem('id');
      formData.append(id, id);


    }
  }

  a3rdelsora() {

    this.ds.uploadimage(this.formDataVar).subscribe((resp) => {


    });

  }


  showedit() {
    this.showupdate = !this.showupdate;

  }

  updateuser() {

    let userdata = {
      userid: sessionStorage.getItem('id'),
      firstname: this.firstname,
      lastname: this.lastname,
      age: this.age,
      phone: this.phone

    }

    this.ds.updateuser(userdata).subscribe((resp) => {

      let response = resp.json();
      if (response.status === 'success') {
        alert('updated successfully');
        this.showupdate = false;
      }
    })

  }

}



