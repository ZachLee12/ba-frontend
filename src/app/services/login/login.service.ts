import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token, UserCredentials } from 'src/app/interfaces/login.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient: HttpClient = inject(HttpClient)

  constructor(

  ) { }

  login(userCredentials: UserCredentials): Observable<Token> {
    const { username, password } = userCredentials
    const httpBody = { username, password }
    return this.httpClient.post<Token>('http://localhost:5555/token', httpBody)
  }

  getProtectedResource(): Observable<any> {
    return this.httpClient.get('http://localhost:5555/protected')
  }
}
