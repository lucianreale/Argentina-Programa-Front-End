import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { PortfolioService } from './services/portfolio.service';


export const AuthGuard = () =>{
  const portfolioService = inject(PortfolioService)
  const router = inject(Router)
  return portfolioService.isAuthenticated$().pipe(
    take(1),
    tap((isLoggedIn)=>
      !isLoggedIn ? router.navigate(['/login']) : true
    )
  )
}
/*
@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
*/