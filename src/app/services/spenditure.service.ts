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

export const URL:string = process.env.API_URL;

@Injectable()
export class SpenditureService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http:Http, private cookieService:CookieService, private router:Router) {

  }

  getMySpenditures(start:number, end:number): Observable<Spenditure[]> {
    return this.http.get(URL + "spenditure?start=" + start + "&end=" + end, {
      headers: this.headers,
      withCredentials: true
    }).map(response => {
      var array = response.json();
      console.log(JSON.stringify(array));
      var spenditures = [];
      for (var i = 0; i < array.length; i++) {
        spenditures[i] = new Spenditure().deserialize(array[i]);
      }

      return spenditures;
    })

  };

  add(spend:Spenditure):Observable<Spenditure> {
    return this.http.post(URL + "spenditure", JSON.stringify(spend), {headers: this.headers, withCredentials: true})
      .map(response=> {
        return new Spenditure().deserialize(response.json());
      });
  };

  update(spend:Spenditure):Observable<Spenditure> {
    return this.http.post(URL + "spenditure/" + spend._id, JSON.stringify(spend), {
        headers: this.headers,
        withCredentials: true
      })
      .map(response=> {
        return new Spenditure().deserialize(response.json());
      });

  };

  delete(spend:Spenditure):Observable<any> {
    return this.http.delete(URL + "spenditure/" + spend._id, {headers: this.headers, withCredentials: true});
  };

  private handleError(error:any):Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  };
}
