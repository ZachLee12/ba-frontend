import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { PageLayoutService } from '../../services/page-layout/page-layout.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  router: Router = inject(Router)
  pageLayoutService: PageLayoutService = inject(PageLayoutService)


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = sessionStorage.getItem('access_token') || null
    if (accessToken) {
      const httpBearerHeader = new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      request = request.clone(
        {
          headers: httpBearerHeader
        }
      )
    }

    return next
      .handle(request)
      .pipe(
        catchError(err => {
          //When JWT expires, server returns 401. 
          //Then redirect user back to login and disable sidenav 
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.router.navigate(['/', 'login'])
            this.pageLayoutService.closeSidenav$()
          }
          return throwError(() => err)
        })
      );
  }
}
