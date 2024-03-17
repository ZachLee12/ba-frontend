import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { inject } from '@angular/core';

// LoggedInGuard is a function that only allows a route to be accessed when the user is logged in and has a non-expired JWT.
export const loggedInGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const loginService: LoginService = inject(LoginService)
  const router: Router = inject(Router)

  const decodedJwt = loginService.getDecodedJwt() as any

  if (decodedJwt) {
    //if Jwt is still valid, redirect user back to /dashboard/home
    if (Date.now() <= decodedJwt.exp * 1000) {
      router.navigate(['/', 'dashboard', 'home'])
    }
    return false
  } else {
    return true;
  }
};
