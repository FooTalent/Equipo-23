import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const nonAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  if(typeof window !== 'undefined' && localStorage.getItem('user_token')) {
    router.navigate(['/']);
    authService.isLoggedIn();
    return false;
  } else {
    authService.isLoggedIn();
    return true;
  }
};
