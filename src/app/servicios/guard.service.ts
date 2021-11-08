import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AutentificacionService } from './autentificacion.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(
    private authS:AuthService,
    private autencification:AutentificacionService,
    private router:Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot):
     boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(this.authS.isLogged);
    if(!this.authS.isLogged||this.autencification.isLogged){
      this.router.navigate(['/login']);
    }
    
    return this.authS.isLogged;
}
}
