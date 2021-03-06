import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {Spenditure} from "./../models/Spenditure";
import {SpenditureService} from "../services/spenditure.service";
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {CookieService} from "angular2-cookie/core";


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {
  spenditures:Spenditure[] = [];
  showProgress:boolean = false;

  spenditureSelected:Spenditure;

  startDate:Date = new Date(new Date().setDate(new Date().getDate() - 7));
  endDate:Date = new Date();

  total:number = 0;


  constructor(public userService:UserService, private spenditureService:SpenditureService, private cookieService:CookieService, private router:Router) {
  }

  ngOnInit():void {
    var session = this.cookieService.getAll();
    console.log(JSON.stringify(session));

    this.showProgress = true;

    this.getSpenditures()

  }

  ngOnChanges():void {

  }

  getSpenditures():void {
    this.spenditureService.getMySpenditures(this.startDate.getTime(), this.endDate.getTime())
      .subscribe(expenses => {

          this.spenditures = expenses;
          this.calculateTotal();

          this.showProgress = false;

        },
        (e) => {
          this.showProgress = false;
          console.log(e);
        });
  }

  onSpenditureAdded(spend:Spenditure):void {
    console.log("Expense Emitted", spend);
    this.spenditures.push(spend);
    this.calculateTotal();
  }

  onSpenditureUpdated(spend:Spenditure):void {
    console.log("Expense Updated", spend);
    if (spend != null) {

    }
    this.spenditureSelected = null;
    this.calculateTotal();
  }

  onSpenditureDeleted(spend:Spenditure):void {
    this.spenditureService.delete(spend).subscribe(spend=> {
        var index = this.spenditures.indexOf(spend, 0);
        if (index > -1) {
          this.spenditures.splice(index, 1);
        }

        this.calculateTotal();
      },
      (e) => {
        this.showProgress = false;
        console.log(e);
      },
      ()=> {

      })


  }

  onDateSendClick():void {
    this.getSpenditures();
  }

  parseDate(dateString:string):Date {
    if (dateString) {
      var date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      return date;
    } else {
      return null;
    }
  }

  calculateTotal(): void {
    this.total = 0;
    for (var i = 0; i < this.spenditures.length; i++) {
      this.total = this.total + this.spenditures[i].amount;
    }
  }
}
