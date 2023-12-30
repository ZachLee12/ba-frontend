import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { LoginService } from 'src/app/core/services/login/login.service';
import { Token, UserCredentials } from 'src/app/interfaces/login.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder)
  loginService: LoginService = inject(LoginService)

  constructor(

  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        'username': ['zachlee', Validators.required],
        'password': ['secret', Validators.required]
      }
    )
  }

  login() {
    const userCredentials: UserCredentials = this.loginForm.value
    this.loginService.login(userCredentials)
      .pipe(tap(res => this.storeTokenInSessionStorage(res)))
      .subscribe()
  }

  getUserMunicipality() {
    this.loginService.getUserMunicipality().subscribe(res => console.log(res))
  }

  storeTokenInSessionStorage(token: Token) {
    type KeyValuePair = [string, string]
    Object.entries(token).forEach((keyValuePair: KeyValuePair) => {
      const [key, value] = keyValuePair
      sessionStorage.setItem(key, value)
    })
  }

}
