import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  nombre: String="Lucianni"
  //showLogin: Boolean= false;
  //subscription?: Subscription;
  /*
  constructor(private portfolioService: PortfolioService) {
    this.subscription = this.portfolioService.onToggle()
                            .subscribe (value => this.showLogin = value)
   }*/
  ngOnInit(): void {
    
  }
/*
  toggleLogin(){
    console.log(this.showLogin)
    this.portfolioService.toggleLogin()
  }
*/  
}
