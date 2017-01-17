import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {UserLoginComponent} from "./user-login/user-login.component";
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {NavbarComponent} from "./navbar/navbar.component";
import {UserService} from "./user.service";
import {SpenditureService} from "./spenditure.service"
import {CookieService} from "angular2-cookie/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AddSpendingComponent} from "./add-spend/add-spend.component";
import {UpdateSpendingComponent} from "./update-spend/update-spend.component";


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    NavbarComponent,
    DashboardComponent,
    AddSpendingComponent,
    UpdateSpendingComponent
  ],
  imports: [
    Ng2BootstrapModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: UserLoginComponent
      },
      {
        path: 'login',
        component: UserLoginComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]),
  ],
  providers: [UserService, SpenditureService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
