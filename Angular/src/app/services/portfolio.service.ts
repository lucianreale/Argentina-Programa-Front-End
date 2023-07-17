import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, throwError } from 'rxjs';
import { LoginReq } from '../interface/LoginReq';
import { User } from '../interface/User';
import { Experience } from '../interface/Experience';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private baseUrl:String = "https://argentina-programa-back-2-0.onrender.com"
  private isLoggedIn$ = new BehaviorSubject<Boolean>(false) 
  private pass:string=""
  user?:User
  private user$ = new BehaviorSubject<User[]>([])

  constructor(private http:HttpClient) {
  }
  
  setUser(user: User[]) {
    this.user$.next(user);
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
  
  login(credentials:LoginReq):Observable<User>{
    this.pass=credentials.pass
    return this.http.post<User>(this.baseUrl+'/login', credentials).pipe(
      catchError(this.handleError)
    )
  }

  saveAbout(data:User):Observable<any>{
    data.pass=this.pass
    return this.http.put<User>(this.baseUrl+'/user/update', data).pipe(
      catchError(this.handleError)
    )
  }

  getEducation(id:BigInt):Observable<[]>{
    return this.http.get<[]>(this.baseUrl+`/education/getbyuserid/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  // Experience
  getExperience(id:BigInt):Observable<[]>{
    return this.http.get<[]>(this.baseUrl+`/experience/getbyuserid/${id}`).pipe(
      catchError(this.handleError)
    )
  }
  
  ///experience/add
  saveExperience(data:Experience):Observable<any>{
    return this.http.post<Experience>(this.baseUrl+'/experience/add', data).pipe(
      catchError(this.handleError)
    )
  }

    ///experience/del/{id}
    deleteExperience(data:Experience):Observable<any>{
      return this.http.delete<Experience>(this.baseUrl+`/experience/del/${data.id}`).pipe(
        catchError(this.handleError)
      )
    }

    ///experience/update
    updateExperience(data:Experience):Observable<any>{
      return this.http.put<Experience>(this.baseUrl+'/experience/update',data).pipe(
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

  getData():Observable<any>{
    return this.http.get('./assets/data/data.json')
  }
}