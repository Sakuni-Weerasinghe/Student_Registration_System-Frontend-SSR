import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state):boolean => {
  return inject(AuthService).isLoggedIn()
  ? true
  : false;
};
