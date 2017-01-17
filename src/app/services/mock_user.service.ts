/**
 * Created by Jose on 10/6/16.
 */
import { Injectable, OnInit } from '@angular/core';
import {User} from "./../models/User";
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import {Observable} from "rxjs/Rx";
import { map } from "rxjs/operator/map.d";
import {CookieService} from "angular2-cookie/core";
import {UserService} from "./user.service";
import {Subject} from "rxjs/Subject";

export const URL:string = "http://localhost:8080/api/";

@Injectable()
export class MockUserService extends UserService {

  private headers = new Headers({'Content-Type': 'application/json'});

  user:User;

  userChange:Subject<User> = new Subject<User>();

  public response: any = {
    user_id: "my_id",
    first_name: "test",
    last_name: "name",
    email: "test@test.com",
    type: "user"
  };

  constructor(private http:Http, private cookieService:CookieService, private router:Router) {
    super(http, cookieService, router);
  }



  updateSession():Observable<User> {
    return Observable.of(this.user);
  }

  loginWitEmail(user:User):Observable<User> {
    return Observable.Of(user);
  };


  createEmailUser(user:User):Observable<User> {
    return Observable.Of(user);
  }

  logOut():void {
  }

  private handleError(error:any):Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  };
}
