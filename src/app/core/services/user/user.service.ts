import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CreateUser, RequestAccountUser } from 'src/app/interfaces/user.interfaces';
import { environment } from 'src/environments/environment.development';

// UserService handles all methods related to user data and actions concerning users. 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient: HttpClient = inject(HttpClient)

  // HTTP POST the RequestAccountUser payload to Alpine API when the user requests for an account.
  // If the user's email is valid, an email verification code should be sent to their email. 
  // Otherwise, a pop-up will inform the user that the request failed, and the reason that it failed.
  createRequestAccountUser$(requestAccountUser: RequestAccountUser): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/users/request-account`, requestAccountUser)
  }

  getUserAccountStatus$(username: string): Observable<any> {
    return this.httpClient
      .get<{ data: any }>(`${environment.apiUrl}/users/user-account-status/${username}`)
      .pipe(map(res => res.data))
  }

  createUser$(createUser: CreateUser): Observable<string> {
    return this.httpClient
      .post<{ data: string }>(`${environment.apiUrl}/users/create`, createUser)
      .pipe(map(res => res.data))
  }
}

