//import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// //import { AuthService } from './auth.service';
// import { AuthService } from './services/auth.service';

// export const loginGuard: CanActivateFn = (route, state) => {

//    const authService = inject(AuthService);
//   const router = inject(Router);

//   if (authService.isLoggedIn()) {
//     return true;
//   } else {
//     router.navigate(['/login']);
//     return false;
//   }
// }



//   return true;
// };



import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const loginOK = authService.isLoggedIn();

  if (!loginOK) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};








// import { Injectable } from "@angular/core";
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginGuard implements CanActivate{
//  // router: Router;

//   constructor(private router: Router){

//   }

//   canActivate(
//     next: ActivatedRouteSnapshot, 
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//       return this.checkLogin();
//   }

//   private checkLogin(){
//     // chiamare il service addetto alla gestione del login e verifico le credenziali per l'accesso 
//     let loginOK : boolean = true;
//     if(!loginOK){
//       this.router.navigate(['/login']);
//       return false;
//     }
//     return true;


//   }
// }