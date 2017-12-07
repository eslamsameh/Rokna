/**
 * Created by eslam on 8/23/2017.
 */

import {Component, ElementRef, Input,Output,EventEmitter}from  '@angular/core';
import {Router, ActivatedRoute}from  '@angular/router';
import {DataService}from './DataService';
import {OnInit} from '@angular/core'
import {Http, Response} from '@angular/http';
import {profileComponent}from './profileComponent'

import 'rxjs/add/operator/map'
import 'rxjs/Rx';


@Component({
  selector: 'user-comment',
  template: `
    <div>
      <div>
        user : {{DataSource.user}} -- comment : {{DataSource.comment}}
        <button (click)="deletecomment(DataSource.id)">delete</button>
        <button (click)="ShowEditComment()" *ngIf="showEdit">Show Edit Comment</button>
        <input type="text" placeholder="Edit Text" *ngIf="EditText" (input)="catchComment($event)"/>
        <button (click)="saveUpdate(DataSource.id)" *ngIf="showSaveButton">save</button>

      </div>


    </div>
  `,
})

export class UserCommentComponent implements OnInit {

  @Input() DataSource: any;
  @Output() eventEmitter = new EventEmitter();
  public showEdit: any = true;
  public EditText: any = false;
  public showSaveButton: any = false;
  productid: any;
  public mycomment = '';

  constructor(public datasrv: DataService, public router: Router, public Activatedroute: ActivatedRoute) {

  }

  ngOnInit() {

  }

  catchComment(comment) {
    this.mycomment = comment.target.value;
  }

  ShowEditComment(id) {
    this.showEdit = false;
    this.EditText = true;
    this.showSaveButton = true;
  }

  saveUpdate(id) {
    this.showEdit = true;
    this.EditText = false;
    this.showSaveButton = false;

    this.productid = this.Activatedroute.snapshot.params['id']

    let userid = sessionStorage.getItem('id');
    this.datasrv.UpdateComment({
      userid: userid,
      productid: this.productid,
      usercommentid: id,
      comment: this.mycomment
    }).subscribe((resp) => {

      let data = resp.json().mycomment;
      this.eventEmitter.emit("delete");



    })
  }


  deletecomment(id) {

    this.productid = this.Activatedroute.snapshot.params['id']

    let userid = sessionStorage.getItem('id');
    this.datasrv.DeleteComment({userid: userid, productid: this.productid, usercommentid: id}).subscribe((resp) => {

      let data = resp.json().comment;
      this.eventEmitter.emit("delete");


    })



  }


}
