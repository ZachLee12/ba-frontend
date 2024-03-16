import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment.development';
import { UserResource } from 'src/app/interfaces/user.interfaces';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  httpClient: HttpClient = inject(HttpClient)
  loginService: LoginService = inject(LoginService)

  getUserResources(): Observable<UserResource[]> {
    const decodedToken = this.loginService.getDecodedJwt()
    const { username } = decodedToken as any
    return this.httpClient
      .get<{ data: UserResource[] }>(`${environment.apiUrl}/users/username/${username}/resources`)
      .pipe(map((res: any) => res.data))
  }

  makeDummyExpressCall(username: string) {
    return this.httpClient.get(`${environment.dummyExpressUrl}/users/username/${username}/resources`)
  }

  redirectToCoP() {
    const token = this.loginService.getJwt()
    const copUrl = `${environment.dummyExpressUrl}/check?token=${token}`
    return this.httpClient.get(copUrl, { responseType: 'text' }).pipe(tap(() => window.open(copUrl)))
  }

}
