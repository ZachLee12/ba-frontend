import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/interfaces/resources.interfaces';
import { CreateUser, RequestAccountUser } from 'src/app/interfaces/user.interfaces';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient: HttpClient = inject(HttpClient)

  createRequestAccountUser(requestAccountUser: RequestAccountUser): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/users/request-account`, requestAccountUser)
  }

  getRequestAccountUsersCount(): Observable<number> {
    return this.httpClient
      .get<{ data: number }>(`${environment.apiUrl}/users/request-account-user-count`)
      .pipe(map(res => res.data))
  }

  createUser(createUser: CreateUser): Observable<string> {
    return this.httpClient
      .post<{ data: string }>(`${environment.apiUrl}/users/create`, createUser)
      .pipe(map(res => res.data))

  }
}

