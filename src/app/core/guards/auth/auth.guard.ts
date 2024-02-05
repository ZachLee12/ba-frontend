import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { inject } from '@angular/core';
import { PageLayoutService } from '../../services/page-layout/page-layout.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService: LoginService = inject(LoginService)
  const router: Router = inject(Router)
  const pageLayoutService: PageLayoutService = inject(PageLayoutService)

  if (state.url.includes('request-account')) {
    return true
  }

  const { exp } = loginService.getDecodedJwt() as any
  // If JWT expires, redirect user to '/login' and lock all routes.
  if (Date.now() >= exp * 1000) {
    router.navigate(['/', 'login'])
    pageLayoutService.closeSidenav$()
    return false
  } else {
    return true;
  }
};
