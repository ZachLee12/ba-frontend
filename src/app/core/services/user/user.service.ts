import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUser } from 'src/app/interfaces/user.interfaces';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient: HttpClient = inject(HttpClient)

  createUser(createUser: CreateUser): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/users/create`, createUser)
  }
}
