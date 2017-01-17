/**
 * Created by Jose on 10/6/16.
 */
import { Injectable, OnInit } from '@angular/core';
import {Spenditure} from "./models/Spenditure";
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import '../../node_modules/rxjs/add/operator/toPromise';
import {Observable} from "../../node_modules/rxjs/Observable";
import {CookieService} from "../../node_modules/angular2-cookie/core";
import {Subject} from "../../node_modules/rxjs/Subject";

export const URL:string = "http://localhost:8080/api/";

@Injectable()
export class SpenditureService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http:Http, private cookieService:CookieService, private router:Router) {

  }

  getMySpenditures(start:number, end:number):Observable<any> {
    return this.http.get(URL + "spenditure?start=" + start + "&end=" + end, {
        headers: this.headers,
        withCredentials: true
      });

  };

  add(spend:Spenditure):Observable<any> {
    return this.http.post(URL + "spenditure", JSON.stringify(spend), {headers: this.headers, withCredentials: true});
  };

  update(spend:Spenditure):Observable<any> {
    return this.http.post(URL + "spenditure/" + spend._id, JSON.stringify(spend), {
        headers: this.headers,
        withCredentials: true
      })

  };

  delete(spend:Spenditure):Observable<any> {
    return this.http.delete(URL + "spenditure/" + spend._id, {headers: this.headers, withCredentials: true});
  };

  private handleError(error:any):Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  };
}
