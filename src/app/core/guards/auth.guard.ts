import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService: LoginService = inject(LoginService)
  const router: Router = inject(Router)

  const { exp } = loginService.getDecodedJwt() as any
  if (Date.now() >= exp * 1000) {
    router.navigate(['/', 'login'])
    return false
  } else {
    return true;
  }
};
