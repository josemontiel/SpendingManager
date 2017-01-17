import { Component, OnInit, OnChanges, Input, Output, QueryList, ViewChildren, ViewChild, EventEmitter, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import {Spenditure} from "../models/Spenditure";
import {SpenditureService} from "../spenditure.service";
import {UserService} from "../user.service";
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";

@Component({
  selector: 'update-spend',
  templateUrl: './update-spend.component.html',
  styleUrls: ['./update-spend.component.scss'],
})
export class UpdateSpendingComponent implements OnInit, OnChanges {

  zone:NgZone;

  @Output() onSpenditureUpdated:EventEmitter<Spenditure> = new EventEmitter<Spenditure>();

  @Input() spending:Spenditure;

  spendingDate:Date;
  spendingTime:Date;

  public showProgress:boolean = false;

  constructor(private router:Router, private spenditureService:SpenditureService, private element:ElementRef) {
    this.zone = new NgZone({enableLongStackTrace: false});
    this.spending = new Spenditure();
  }


  ngOnInit():void {


  }

  ngOnChanges():void {
    this.spendingDate = new Date(this.spending.when);
    this.spendingTime = new Date(this.spending.when);
  }


  onUpdateClicked():void {

    this.showProgress = true;

    this.spending.when = this.joinTime();

    this.spenditureService.update(this.spending).subscribe(response => {
      var spend = new Spenditure().deserialize(response.json());
      this.showProgress = false;
      this.onSpenditureUpdated.emit(spend);
    }, (e) => {
      this.showProgress = false;
      console.log(e);
    }, () => {

    });
  }

  onUpdateCanceled():void {
    this.showProgress = false;
    this.onSpenditureUpdated.emit(null);
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
