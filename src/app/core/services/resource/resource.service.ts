import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/app/interfaces/resources.interfaces';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  httpClient: HttpClient = inject(HttpClient)
  loginService: LoginService = inject(LoginService)

  getUserResources(): Observable<User> {
    const decodedToken = this.loginService.getDecodedJwt()
    const { username } = decodedToken as any
    return this.httpClient
      .get<User>(`${environment.apiUrl}/database/users/username/${username}`)
      .pipe(map((res: any) => res.data))
  }

  makeDummyExpressCall(username: string) {
    return this.httpClient.get(`http://localhost:5000/users/username/${username}/resources`)
  }

}
