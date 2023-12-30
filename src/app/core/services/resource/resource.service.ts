import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  httpClient: HttpClient = inject(HttpClient)
  loginService: LoginService = inject(LoginService)

  getUserMunicipality(): Observable<any> {
    const decodedToken = this.loginService.getDecodedJwt()
    const { username } = decodedToken as any
    return this.httpClient.get(`http://localhost:5000/municipality/user/${username}`)
  }
}
