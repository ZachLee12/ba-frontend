import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token, UserCredentials, UserNonceSession } from 'src/app/interfaces/login.interfaces';
import { Observable, tap } from 'rxjs';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { UserEmailVerificationCode } from 'src/app/interfaces/user.interfaces';

// LoginService handles all tasks that are related to the user authentication process, 
// which is when they try to log in.
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient: HttpClient = inject(HttpClient)
  private router: Router = inject(Router)

  currentNonce!: string
  currentUsername!: string

  // Submit username and password to Alpine API to get a `nonce session`, in which the `nonce` (a random string) returned is needed
  // for the second login process that uses the One Time Password (OTP).
  // This `nonce session` is to ensure that no attacker can intercept this login process, the Alpine API also checks if the 
  // nonce that the user submitted matches the nonce that it had first issued to the user that initiated the request.
  loginForNonceSession$(userCredentials: UserCredentials): Observable<UserNonceSession> {
    const { username, password } = userCredentials
    const httpBody = { username, password }
    return this.httpClient.post<UserNonceSession>(`${environment.apiUrl}/otp/login-otp-nonce`, httpBody)
      .pipe(tap(response => {
        this.currentUsername = response.username
        this.currentNonce = response.nonce
      }))
  }

  submitOtp$(otp: string): Observable<Token> {
    const otpNoncePair = { otp, username: this.currentUsername, nonce: this.currentNonce }
    return this.httpClient.post<Token>(`${environment.apiUrl}/otp/verify-otp-nonce`, otpNoncePair)
  }

  logout(): void {
    // Clear the JWT that are stored in session storage.
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }

  getDecodedJwt(): string | null {
    const token = sessionStorage.getItem('access_token') || null
    if (token) {
      return jwt_decode.jwtDecode(token)
    } else {
      return null
    }
  }

  getJwt(): string | null {
    return sessionStorage.getItem('access_token') || null
  }

  // Get the QR Code url string that is used to render the QR Code that users can scan to 
  // add OTP to their authenticator app.
  getQrCodeUrl$(): Observable<string> {
    return this.httpClient.get<string>(`${environment.apiUrl}/otp/otp-qrcode-uri`)
  }

  setTokenInSessionStorage(token: Token): void {
    Object.entries(token).forEach(([key, value]) => {
      sessionStorage.setItem(key, value)
    })
  }

  verifyEmailVerificationCode$(username: string, verificationCode: string): Observable<boolean> {
    const body: UserEmailVerificationCode = {
      username,
      verification_code: verificationCode
    }
    return this.httpClient.post<boolean>(`${environment.apiUrl}/verify-email/verify-email-with-verification-code`, body)
  }
}
