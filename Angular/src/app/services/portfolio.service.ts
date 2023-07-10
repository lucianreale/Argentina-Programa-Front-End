import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, throwError } from 'rxjs';
import { LoginReq } from '../interface/LoginReq';
import { User } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private baseUrl:String = "https://argentina-programa-back-2-0.onrender.com"
  private readonly isLoggedIn = new BehaviorSubject<Boolean>(false) 
  user?:User
  _user:any={}
  constructor(private http:HttpClient) {
    this._user = new BehaviorSubject<{}>({})
  }
  
  isAuthenticated$():Observable <Boolean>{
    return this.isLoggedIn
  }

  login(credentials:LoginReq):Observable<User>{
    return this.http.post<User>(this.baseUrl+'/login', credentials).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(user?:User){
    //this.userArray[0]=user
    //this._user.next(this.userArray)
    
    this.user=user
  }

  updateLoginStatus(newState:Boolean){
    this.isLoggedIn.next(newState);
    console.log(this.isLoggedIn)
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Error:', error.error)
    } else {
      console.log('Backend retorno el codigo: ',error.status,error.error)
    }
    return throwError(()=> new Error('Algo Salio Mal. Por favor intente nuevamente mas tarde...'))
  }

  getData():Observable<any>{
    return this.http.get('./assets/data/data.json')
  }
}