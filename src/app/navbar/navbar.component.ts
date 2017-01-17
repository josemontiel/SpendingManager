import {Component, OnInit, HostListener } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public userService:UserService) {

  }

  ngOnInit():void {

  }

  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }

  onLogOut():void {
    this.userService.logOut();
  }

}
