/**
 * Created by Jose on 10/6/16.
 */
import { Injectable, OnInit } from '@angular/core';
import {User} from "./models/User";
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import '../../node_modules/rxjs/add/operator/toPromise';
import {Observable} from "../../node_modules/rxjs/Observable";
import {CookieService} from "../../node_modules/angular2-cookie/core";
import {Subject} from "../../node_modules/rxjs/Subject";

export const URL:string = "http://localhost:8080/api/";

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});

  user:User;

  userChange:Subject<User> = new Subject<User>();

  constructor(private http:Http, private cookieService:CookieService, private router:Router) {
    this.init();
  }

  private init() {
    console.log("Update Session");
    this.updateSession()
      .subscribe(
        response => {
          let owner = new User().deserialize(response.json());
          console.log("User Updated: ", owner);
          this.user = owner;
          this.userChange.next(this.user);

          console.log("Service User", this.user);
          if (this.user) {
            let link = ["/dashboard"];
            this.router.navigate(link);
          }
        },
        this.handleError,
        () => {
        });
  };


  updateSession():Observable<any> {
    return this.http.get(URL + "user", {headers: this.headers, withCredentials: true});
  }

  loginWitEmail(user:User):Promise<User> {
    return this.http.post(URL + "user/login", JSON.stringify(user), {
        headers: this.headers,
        withCredentials: true
      })
      .toPromise()
      .then(response => {
        console.log("Response: " + response.json());
        this.user = new User().deserialize(response.json());

        return this.user;
      })
      .catch(this.handleError);
  };


  createEmailUser(user:User):Promise<User> {
    return this.http.post(URL + "user/signup", JSON.stringify(user), {headers: this.headers, withCredentials: true})
      .toPromise()
      .then(response => {
        console.log("User Created", response);
        this.user = new User().deserialize(response.json());

        return this.user;
      })
      .catch(this.handleError);
  }

  logOut():void {


    this.http.get(URL + "user/logout", {
        headers: this.headers,
        withCredentials: true
      })
      .subscribe(
        response => {
          this.cookieService.removeAll();
          this.user = null;
          this.userChange.next(this.user);
          this.router.navigateByUrl("/login");

        },
        this.handleError,
        () => {
        });

  }

  private handleError(error:any):Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  };
}
