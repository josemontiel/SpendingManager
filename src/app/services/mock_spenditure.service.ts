/**
 * Created by Jose on 10/6/16.
 */
import { Injectable, OnInit } from '@angular/core';
import {Spenditure} from "./../models/Spenditure";
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import {Observable} from "rxjs/Rx";
import { map } from "rxjs/operator/map.d";
import {CookieService} from "angular2-cookie/core";
import {SpenditureService} from "./spenditure.service";
import {User} from "../models/User";

export const URL:string = "http://localhost:8080/api/";

@Injectable()
export class MockSpenditureService extends SpenditureService {

  private headers = new Headers({'Content-Type': 'application/json'});

  public response: any;

  constructor(private http:Http, private cookieService:CookieService, private router:Router) {
    super(http, cookieService, router);

  }

  getMySpenditures(start:number, end:number):Observable<any> {
    return Observable.of(
      [
        this.response
      ]
    );

  };

  add(spend:Spenditure):Observable<any> {
    this.response = spend;
    return Observable.of(spend);
  };

  update(spend:Spenditure):Observable<any> {
    this.response = spend;
    return Observable.of(spend);

  };

  delete(spend:Spenditure):Observable<any> {
    return Observable.empty();
  };

  private handleError(error:any):Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  };
}
