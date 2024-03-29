import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EmailVerification } from 'src/app/interfaces/user.interfaces';
import { environment } from 'src/environments/environment.development';

// AdminService handles all tasks that only Admins can perform. 
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpClient: HttpClient = inject(HttpClient)

  getAllEmailVerifications$(): Observable<EmailVerification[]> {
    return this.httpClient.get<{ data: EmailVerification[] }>(`${environment.apiUrl}/users/email-verifications`)
      .pipe(map(res => res.data))
  }

  rejectUserAccountRequest$(username: string): Observable<boolean> {
    return this.httpClient.delete<{ data: boolean }>(`${environment.apiUrl}/verify-email/delete-user-email-verification/${username}`)
      .pipe(map(res => res.data))
  }

  getAllUsers$(): Observable<{ username: string, is_password_viewed: boolean }[]> {
    return this.httpClient.get<{ data: { username: string, is_password_viewed: boolean }[] }>(`${environment.apiUrl}/users`)
      .pipe(map(res => res.data))
  }

  getRequestAccountUsersCount$(): Observable<number> {
    return this.httpClient
      .get<{ data: number }>(`${environment.apiUrl}/users/request-account-user-count`)
      .pipe(map(res => res.data))
  }
}
