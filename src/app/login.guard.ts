import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  //const loginOK = authService.isLoggedIn();
  const loginOK = authService.notExpired()

  // if (!loginOK) {
  //   router.navigate(['/login']);
  //   return false;
  // }

   if (!loginOK) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};