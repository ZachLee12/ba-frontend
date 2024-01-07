import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  httpClient: HttpClient = inject(HttpClient)
  loginService: LoginService = inject(LoginService)

  getUserMunicipality(): Observable<any> {
    const decodedToken = this.loginService.getDecodedJwt()
    const { username } = decodedToken as any
    return this.httpClient
      .get(`${environment.apiUrl}/municipality/user/${username}`)
      .pipe(map((res: any) => res.data))
  }

  getUserIndicators(): Observable<any> {
    const decodedToken = this.loginService.getDecodedJwt()
    const { username } = decodedToken as any
    return this.httpClient
      .get(`${environment.apiUrl}/municipality/indicators/user/${username}`)
      .pipe(map((res: any) => res.data))
  }


}
