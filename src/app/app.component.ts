import { Component, inject } from '@angular/core';
import { Event as NavigationEvent, NavigationStart, Router } from '@angular/router';
import { LoginService } from './core/services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  router: Router = inject(Router)
  loginService: LoginService = inject(LoginService)
  userIsLoggedIn: boolean = false

  ngOnInit() {
    //redirect to login page if user is not logged in
    if (!sessionStorage.getItem('access_token')) {
      this.router.navigate(['login'])
    }

    //listen to route change events to hide sidenav accordingly
    this.router.events.subscribe(
      {
        next: (event: NavigationEvent) => {
          if (event instanceof NavigationStart) {
            this.userIsLoggedIn = sessionStorage.getItem('access_token') ? true : false
          }
        }
      }
    )
  }

  logout() {
    this.loginService.logout()
  }

}
