import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EmailVerification } from 'src/app/interfaces/resources.interfaces';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpClient: HttpClient = inject(HttpClient)

  getAllEmailVerifications(): Observable<EmailVerification[]> {
    return this.httpClient.get<{ data: EmailVerification[] }>(`${environment.apiUrl}/database/email-verifications`)
      .pipe(map(res => res.data))
  }
}
