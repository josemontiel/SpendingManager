import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {UserService} from "./../user.service";
import {User} from "./../models/User";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  public isMenuCollapsed: boolean = true;
  public isNotificationCollapsed: boolean = true;
  public showProgress: boolean = false;
  isLoginFormReady: boolean = false;
  isSignupFormReady: boolean = false;
  inputEmail: string = "";
  inputPassword: string = "";

  inputSignupEmail: string = "";
  inputSignupPassword: string = "";
  inputSignupFirstName: string = "";
  inputSignupLastName: string = "";
  inputSignupType: string = "user";

  alerts = [];


  constructor(private router: Router, private cookieService: CookieService, private userService:UserService) {

  }

  ngOnInit() {
  }

  onLogin(owner: User): void {
    this.showProgress = false;

    var session = this.cookieService.getAll();
    console.log(JSON.stringify(session));

    let link = ["/dashboard"];
    this.router.navigate(link);
  }

  doLoginWithEmail(): void {
    this.showProgress = true;

    var user = new User();
    user.email = this.inputEmail.trim();
    user.password = this.inputPassword.trim();

    this.userService.loginWitEmail(user).then(logUser => {
      this.onLogin(logUser);
    })
      .catch(() => {
        this.showProgress = false;
        this.alerts.push({type: 'warning', msg: 'We couldn\'t find your account. Check your Email and Password.'})
      })
  }

  doSignupWithEmail(): void {
    this.showProgress = true;

    var user = new User();
    user.email = this.inputSignupEmail.trim();
    user.password = this.inputSignupPassword.trim();
    user.first_name = this.inputSignupFirstName.trim();
    user.last_name = this.inputSignupLastName.trim();
    user.type = this.inputSignupType;


    this.userService.createEmailUser(user).then(logUser => {
        this.onLogin(logUser);
      })
      .catch(() => {
        this.showProgress = false;
        this.alerts.push({type: 'warning', msg: 'We couldn\'t find your account. Check your Email and Password.'})
      })
  }

  onFormChange(event: any): void {
    this.isLoginFormReady = this.inputEmail.trim().length > 0 && this.inputPassword.trim().length >= 8;
    this.isSignupFormReady = this.inputSignupEmail.trim().length > 0 && this.inputSignupPassword.trim().length >= 8
      && this.inputSignupFirstName.trim().length > 0 && this.inputSignupLastName.trim().length > 0;

  }

}
