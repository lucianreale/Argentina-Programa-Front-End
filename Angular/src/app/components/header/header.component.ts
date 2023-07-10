import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { LoginFormComponent } from '../login-form/login-form.component';
import { User } from 'src/app/interface/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //private user: User[]=[]
  user?:User
  //private user: User[] = []

  constructor (private portfolioService: PortfolioService){}

  ngOnInit() {
    /*this.loginFormComponent.user.subscribe(user=>{
      console.log(user)
    })*/
    this.user = this.portfolioService.user
  }
}
