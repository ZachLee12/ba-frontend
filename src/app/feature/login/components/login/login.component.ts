import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import { PageLayoutService } from 'src/app/core/services/page-layout/page-layout.service';
import { SnackbarComponent } from 'src/app/feature/standalone/snackbar/snackbar.component';
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
  router: Router = inject(Router)
  pageLayoutService: PageLayoutService = inject(PageLayoutService)
  _snackBar: MatSnackBar = inject(MatSnackBar)

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        'username': ['', Validators.required],
        'password': ['secret', Validators.required]
      }
    )
  }

  openSnackBar(message: string, actionText: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000, //milliseconds for snackbar to stay open
      data: {
        message,
        actionText
      }
    });
  }

  login() {
    const username = this.loginForm.get('username')?.value.trim()
    const password = this.loginForm.get('password')?.value.trim()
    const userCredentials: UserCredentials = { username, password }
    this.loginService.login(userCredentials)
      .subscribe({
        next: tokenResponse => {
          this.storeTokenInSessionStorage(tokenResponse)
          this.pageLayoutService.openSidenav$()
          this.router.navigate(['dashboard', 'home'])
        },
        error: err => this.openSnackBar('Invalid username or password.', 'OK')
      })
  }

  storeTokenInSessionStorage(token: Token) {
    type KeyValuePair = [string, string]
    Object.entries(token).forEach((keyValuePair: KeyValuePair) => {
      const [key, value] = keyValuePair
      sessionStorage.setItem(key, value)
    })
  }

}
