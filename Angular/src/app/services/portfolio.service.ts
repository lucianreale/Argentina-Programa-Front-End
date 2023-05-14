import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private showLogin: boolean=false;
  private subject = new Subject();
  
  constructor(private http:HttpClient) {
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



