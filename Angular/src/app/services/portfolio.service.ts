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
  private isLoggedIn$ = new BehaviorSubject<Boolean>(false) 
  user?:User
  private user$ = new BehaviorSubject<User[]>([]);

  constructor(private http:HttpClient) {
  }
  
  login(credentials:LoginReq):Observable<User>{
    return this.http.post<User>(this.baseUrl+'/login', credentials).pipe(
      catchError(this.handleError)
    )
  }

  setUser(user: User[]) {
    this.user$.next(user);
  }

  getEducation(id:BigInt):Observable<[]>{
    return this.http.get<[]>(this.baseUrl+`/education/getbyuserid/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  getUser() {
    return this.user$.asObservable();
  }

  isAuthenticated$(){
    return this.isLoggedIn$.asObservable()
  }

  updateLoginStatus(newState:Boolean){
    this.isLoggedIn$.next(newState);
    console.log(this.isLoggedIn$)
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