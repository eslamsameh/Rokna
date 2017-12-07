/**
 * Created by eslam on 8/7/2017.
 */

import {Component}from  '@angular/core';
import {DataService}from './DataService';
import {AppComponent} from './app.component'
import {Router} from '@angular/router'
@Component({
  selector: 'login-Comp',
  styleUrls: ['./app.component.css'],
  template: `
    <form action="/action_page.php">
      <div class="imgcontainer">

      </div>

      <div class="container">
        <label><b>Username</b></label>
        <input type="text" [(ngModel)]="firstname" placeholder="Enter Username" name="uname" required>

        <label><b>Password</b></label>
        <input type="password" [(ngModel)]="password" placeholder="Enter Password" name="psw" required>

        <button type="submit" (click)="LoginNow()">Login</button>
        <input type="checkbox" checked="checked"> Remember me
      </div>

      <div class="container" style="background-color:#f1f1f1">

        <a routerLink="/Reg">Register</a>
      </div>
    </form>
  `,


})
export class login {

  public firstname:string="";
  public password:string="";

  constructor(public Dservice:DataService,public router:Router)
  {

  }

  LoginNow ()
  {
    let userLoginData = {
      firstname:this.firstname,
      password:this.password
    }
debugger;
    this.Dservice.LoginUser(userLoginData).subscribe((resp)=>{
      console.log(resp.json().user);
      if(resp.json().status==="success")
      {
let data = resp.json();
        sessionStorage.setItem("name",userLoginData.firstname);

        sessionStorage.setItem("id",data.user.userid);
        this.router.navigateByUrl("profile");


      }
      else
      {
        alert("fail")
      }
    })

  }

}
