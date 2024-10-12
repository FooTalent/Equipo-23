import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (localStorage.getItem('user_token')) {
    authService.isLoggedIn();
    return true;
  } else {
    router.navigate(['/login']);
    authService.isLoggedIn();
    return false;
  }
};
