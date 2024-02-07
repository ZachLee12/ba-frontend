import { Component, inject } from '@angular/core';
import { Event as NavigationEvent, NavigationStart, Router } from '@angular/router';
import { LoginService } from './core/services/login/login.service';
import { jwtDecode } from 'jwt-decode';
import { PageLayoutService } from './core/services/page-layout/page-layout.service';
import { Observable } from 'rxjs';
import { SidenavStateEnum } from './interfaces/pageLayout.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  router: Router = inject(Router)
  loginService: LoginService = inject(LoginService)
  pageLayoutService: PageLayoutService = inject(PageLayoutService)

  userIsLoggedIn: boolean = false
  username!: string;
  readonly sidenavStateEnum = SidenavStateEnum;

  ngOnInit() {
    //redirect to login page if user is not logged in, except for request-access page
    const accessToken = sessionStorage.getItem('access_token')
    if (!accessToken) {
      // this.router.navigate(['login'])
    } else {
      this.pageLayoutService.openSidenav$()
      this.updateUsernameBasedOnToken()
    }

    //listen to route change events to hide sidenav accordingly
    this.router.events.subscribe(
      {
        next: (event: NavigationEvent) => {
          if (event instanceof NavigationStart) {
            this.userIsLoggedIn = sessionStorage.getItem('access_token') ? true : false
            if (this.userIsLoggedIn) {
              this.updateUsernameBasedOnToken()
            }
          }
        }
      }
    )
  }

  getSidenavState$(): Observable<SidenavStateEnum> {
    return this.pageLayoutService.getSidenavState$()
  }

  updateUsernameBasedOnToken() {
    const decoded = jwtDecode(sessionStorage.getItem('access_token')!) as any
    this.username = decoded.username
  }

  logout() {
    this.pageLayoutService.closeSidenav$()
    this.loginService.logout()
  }
}
