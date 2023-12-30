import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  router: Router = inject(Router)

  ngOnInit() {
    //redirect to login page if user is not logged in
    if (!sessionStorage.getItem('access_token')) {
      this.router.navigate(['login'])
    }
  }
}
