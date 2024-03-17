import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { inject } from '@angular/core';
import { PageLayoutService } from '../../services/page-layout/page-layout.service';

// AuthGuard is a function that only allows a route to be accessed when the user is logged in and has a non-expired JWT.
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const loginService: LoginService = inject(LoginService)
  const router: Router = inject(Router)
  const pageLayoutService: PageLayoutService = inject(PageLayoutService)

  // /login/request-account does not depend on whether the user is logged in to be accessed.
  if (state.url.includes('request-account')) {
    return true
  }

  const decodedJwt = loginService.getDecodedJwt() as any
  if (decodedJwt) {
    const { exp } = loginService.getDecodedJwt() as any
    // If JWT expires, redirect user to '/login' and prevent all routes from being accessed.
    if (Date.now() >= exp * 1000) {
      router.navigate(['/', 'login'])
      pageLayoutService.closeSidenav$()
      return false
    } else {
      return true
    }
  } else {
    return true
  }
};
