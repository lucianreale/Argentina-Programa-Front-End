import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  mail: string = "";
  pass: string = "";
  showLogin: Boolean = false;
  subscription?: Subscription;

  constructor(private portfolioService: PortfolioService) {
    this.subscription = this.portfolioService.onToggle()
                            .subscribe (value => this.showLogin = value)
   }
  ngOnInit(): void {
    
  }

  onSubmit(){
    console.log("submin")
    if (this.mail.length === 0) {
      alert("Completar Correo")
      return
    }
    if (this.pass.length === 0) {
      alert("Completar Contraseña")
      return
    }
    const {mail,pass} = this
    const newLogin = { mail, pass }
   

  }
}
