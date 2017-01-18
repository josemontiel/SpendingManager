import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MockSpenditureService} from "../services/mock_spenditure.service";
import {AddSpendingComponent} from "./add-spend.component";
import {Spenditure} from "../models/Spenditure";
import {Ng2BootstrapModule} from "ng2-bootstrap/index";
import {CookieService} from "angular2-cookie/core";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {UserLoginComponent} from "../user-login/user-login.component";
import {UserService} from "../services/user.service";
import {AppComponent} from "../app.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {UpdateSpendingComponent} from "../update-spend/update-spend.component";
import {SpenditureService} from "../services/spenditure.service";
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable'




/**
 * Created by Jose on 1/17/17.
 */

describe('Update-Spend: component', () => {
  let component: UpdateSpendingComponent;
  let fixture: ComponentFixture<AddSpendingComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
          UpdateSpendingComponent,
        ],
        imports: [
          Ng2BootstrapModule.forRoot(),
          BrowserModule,
          FormsModule,
          HttpModule,
          RouterTestingModule,
        ],
        providers: [UserService, SpenditureService, CookieService],
        bootstrap: [AppComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpendingComponent);
    let service = new MockSpenditureService(null, null, null);
    component = fixture.componentInstance;
    component.spenditureService = service;

    let spending: Spenditure = {
      description: "This is a test",
      when: 1484680667070,
      amount: 10,
    };

    spyOn(component.spenditureService, 'update').and.returnValue(Observable.of(spending));

    fixture.detectChanges();
  });


  //specs
  it('should match with two way binding Spenditure made by form', done => {
    let element = fixture.nativeElement;

    var spending: Spenditure = {
      description: "This is a test",
      when: 1484680667070,
      amount: 10,
    };

    let service: MockSpenditureService = component.spenditureService;
    service.response = spending;

    element.querySelector('#description-text-input').value = 'This is a test';
    element.querySelector('#amount-text-input').value = 10;

    component.spendingDate = new Date(1484680667070);
    component.spendingTime = new Date(1484680667070);

    service.update(component.spending).subscribe(toCheck => {
      fixture.detectChanges(); //trigger change detection
      expect(toCheck.description).toBe(spending.description);
      expect(toCheck.amount).toBe(spending.amount);
      expect(toCheck.when).toBe(spending.when);

      done();
    });

  });
});
