import { Component, OnInit } from '@angular/core';
//import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginReq } from 'src/app/interface/LoginReq';
import { User } from '../../interface/User'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginError:String=""
  logInBtnDisabled:Boolean=false
  logInBtnText:String="Login"
  user:User[]=[]
  loginForm= this.formbuilder.group({
    mail:['lucianreale@gmail.com',[Validators.required, Validators.email]],
    pass:['lucianreale',Validators.required]
  })

  constructor(private formbuilder: FormBuilder, private router:Router, private portfolioService: PortfolioService) {
  }

  login(){
    this.loginForm.markAllAsTouched()
    if (this.loginForm.valid){
      this.logInBtnDisabled=!this.logInBtnDisabled
      this.logInBtnText="Cargando..."
      this.portfolioService.login(this.loginForm.value as LoginReq).subscribe({
        next: (userData) => {
          this.user[0]=userData
        },
        error: (errorData) =>{
          this.logInBtnDisabled=!this.logInBtnDisabled
          this.logInBtnText="Login"
          console.log(errorData)
          this.loginError=errorData
        },
        complete: () =>{
          this.portfolioService.updateLoginStatus(true)
          console.log(this.portfolioService.isAuthenticated$())
          this.logInBtnText="Login"
          this.logInBtnDisabled=!this.logInBtnDisabled
          if (this.user===null){
            this.loginError="Usuario y/o Contraseña Incorrecto"
          } else {
            this.portfolioService.setUser(this.user)
            this.router.navigateByUrl('/dashboard')
            this.loginForm.reset()
          }
        } 
      })
    } 
  } 

  get mail(){
    return this.loginForm.controls.mail
  }

  get pass(){
    return this.loginForm.controls.pass
  }

  ngOnInit() {
  }
}