import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { LoginReq } from '../interface/LoginReq';
import { User } from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private showLogin: boolean=true;
  private subject = new Subject();
  private baseUrl:String = "https://argentina-programa-back-2-0.onrender.com"
  constructor(private http:HttpClient) {
  }

  login(credentials:LoginReq):Observable<User>{
    return this.http.post<User>(this.baseUrl+'/login', credentials).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Error:', error.error)
    } else {
      console.log('Backend retorno el codigo: ',error.status,error.error)
    }
    return throwError(()=> new Error('Algo Salio Mal. Por favor intente nuevamente mas tarde...'))
  }

  toggleLogin():void{
    this.showLogin = ! this.showLogin
    this.subject.next(this.showLogin)
  }

  onToggle():Observable<any>{
    return this.subject.asObservable();
  }

  getData():Observable<any>{
    return this.http.get('./assets/data/data.json')
  }
}