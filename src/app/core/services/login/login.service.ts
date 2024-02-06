import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token, UserCredentials, UserNonceSession } from 'src/app/interfaces/login.interfaces';
import { Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient: HttpClient = inject(HttpClient)
  private router: Router = inject(Router)

  constructor(

  ) { }

  loginForNonceSession(userCredentials: UserCredentials): Observable<UserNonceSession> {
    const { username, password } = userCredentials
    const httpBody = { username, password }
    return this.httpClient.post<UserNonceSession>('http://localhost:5555/token', httpBody)
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }

  submitOtp(otp: string) {
    return this.httpClient.post('http://localhost:5555/verify-otp', { otp })
  }

  getDecodedJwt() {
    const token = sessionStorage.getItem('access_token') || null
    if (token) {
      return jwt_decode.jwtDecode(token)
    } else {
      return null
    }
  }

  getJwt() {
    return sessionStorage.getItem('access_token') || null
  }

}
