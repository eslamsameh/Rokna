/**
 * Created by eslam on 8/7/2017.
 */
import { Component }from  '@angular/core';
import {DataService}from './DataService';
import {AppComponent} from './app.component'
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router'


@Component({
  selector:'Reg-Comp',
  template:`
    <div class="container">
        <h2>Registration In Rokna</h2>
        <div class="form-group">
          <label for="firstName" class="col-sm-3 control-label">First Name</label>
          <div class="col-sm-9">
            <input type="text" ngDefaultControl id="firstName" [(ngModel)]="firstname" placeholder="firstname" class="form-control" autofocus>
          </div>
        </div>
        <div class="form-group">
          <label for="lastname" class="col-sm-3 control-label">Last Name</label>
          <div class="col-sm-9">
            <input type="lastname" id="lastname" [(ngModel)]="lastname" placeholder="Last Name" class="form-control">
          </div>
        </div>
        <div class="form-group">
          <label for="password" class="col-sm-3 control-label">Password</label>
          <div class="col-sm-9">
            <input type="password" id="password" [(ngModel)]="password" placeholder="Password" class="form-control">
          </div>
        </div>
        <div class="form-group">
          <label for="Phone" class="col-sm-3 control-label">Phone</label>
          <div class="col-sm-9">
            <input type="Phone" [(ngModel)]="phone" id="Phone" class="form-control">
          </div>
        </div>
        <div class="form-group">
          </div>
        <div class="form-group">
          <label for="age" class="col-sm-3 control-label">Age</label>
          <div class="col-sm-9">
            <input type="age" id="age" [(ngModel)]="age" class="form-control">
          </div>
        </div>
        <div class="form-group">
        </div>
        <div class="form-group">
          <div class="col-sm-9 col-sm-offset-3">
            <button type="submit" class="btn btn-primary btn-block"  [(ngModel)]="new_user"(click)="saveuser(new_user)">Register</button>
          </div>
        </div>
        <div class="col-sm-9 col-sm-offset-3">
          <button class="btn btn-secondary btn-block"  >Cancel</button>
        </div>
  
    </div> 
    




  `,
  styleUrls: ['./regComponent.css'],



})
export class RegComponent{


public user : any={};


  public firstname:string="";
  public lastname:string="";
  public password:string;
  public phone:any;
  public age:any;

public new_user;


  constructor(public dataService:DataService,public router : Router){

  }



  saveuser(user){

    if(this.firstname==="" || this.lastname==="")
    {
      alert("error")
    }
else {
      this.user=({firstname:this.firstname,
        lastname:this.lastname,
        password:this.password,
        phone:this.phone,
        age:this.age});
      this.firstname="";
      this.lastname="";
      this.password="";
      this.phone="";
      this.age="";

      this.dataService.saveuser(this.user).subscribe((response)=>{
        console.log(response.json());

        this.router.navigateByUrl("profile")
        

      });
    }


      }


}










