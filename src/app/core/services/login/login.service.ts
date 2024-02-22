import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token, UserCredentials, UserNonceSession } from 'src/app/interfaces/login.interfaces';
import { Observable, tap } from 'rxjs';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { UserEmailVerificationCode } from 'src/app/interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient: HttpClient = inject(HttpClient)
  private router: Router = inject(Router)
  // testinggg git
  currentNonce!: string
  currentUsername!: string

  loginForNonceSession(userCredentials: UserCredentials): Observable<UserNonceSession> {
    const { username, password } = userCredentials
    const httpBody = { username, password }
    return this.httpClient.post<UserNonceSession>(`${environment.apiUrl}/login-otp-nonce`, httpBody)
      .pipe(tap(response => {
        this.currentUsername = response.username
        this.currentNonce = response.nonce
      }))
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }

  submitOtp(otp: string): Observable<Token> {
    const otpNoncePair = { otp, username: this.currentUsername, nonce: this.currentNonce }
    return this.httpClient.post<Token>(`${environment.apiUrl}/otp/verify-otp-nonce`, otpNoncePair)
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

  getQrCodeUrl(): Observable<string> {
    return this.httpClient.get<string>(`${environment.apiUrl}/otp/otp-qrcode-uri`)
  }

  setTokenInSessionStorage(token: Token): void {
    Object.entries(token).forEach(([key, value]) => {
      sessionStorage.setItem(key, value)
    })
  }

  verifyEmail(email: string): Observable<boolean> {
    //prevent from submitting an empty string to the server
    if (email.trim() === '') {
      email = 'dummy-email@dummy.com'
    }
    return this.httpClient.get<boolean>(`${environment.apiUrl}/verify-email/${email}`)
  }

  verifyEmailVerificationCode(username: string, verificationCode: string) {
    const body: UserEmailVerificationCode = {
      username,
      verification_code: verificationCode
    }
    return this.httpClient.post(`${environment.apiUrl}/verify-email-with-verification-code`, body)
  }
}
