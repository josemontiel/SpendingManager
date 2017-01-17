import { Component, OnInit, Output, QueryList, ViewChildren, ViewChild, EventEmitter, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import {Spenditure} from "../models/Spenditure";
import {SpenditureService} from "../services/spenditure.service";
import {UserService} from "../services/user.service";
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";

@Component({
  selector: 'add-spend',
  templateUrl: './add-spend.component.html',
  styleUrls: ['./add-spend.component.scss'],
})
export class AddSpendingComponent implements OnInit {

  @Output() onSpenditureAdded:EventEmitter<Spenditure> = new EventEmitter<Spenditure>();

  spending:Spenditure;

  spendingDate:Date = new Date();
  spendingTime:Date = new Date();

  public showProgress:boolean = false;

  constructor(private router:Router, public spenditureService:SpenditureService, private element:ElementRef) {
    this.spending = new Spenditure();
  }


  ngOnInit():void {


  }


  onAddClicked():void {

    this.showProgress = true;

    this.spending.when = this.joinTime();

    this.spenditureService.add(this.spending)
      .subscribe(spend => {
          this.showProgress = false;
          this.onSpenditureAdded.emit(spend);

        },
        (e) => {
          this.showProgress = false;
          console.log(e);
        },
        () => {
        });
  }

  parseDate(dateString:string):number {
    if (dateString) {
      return new Date(dateString).getTime();
    } else {
      return null;
    }
  }

  joinTime():number {

    this.spendingDate.setHours(this.spendingTime.getHours());
    this.spendingDate.setMinutes(this.spendingTime.getMinutes());
    return this.spendingDate.getTime();

  }

}
