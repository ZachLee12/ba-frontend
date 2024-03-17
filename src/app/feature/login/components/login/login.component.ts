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
  formBuilder: FormBuilder = inject(FormBuilder)
  loginService: LoginService = inject(LoginService)
  router: Router = inject(Router)
  pageLayoutService: PageLayoutService = inject(PageLayoutService)
  snackBar: MatSnackBar = inject(MatSnackBar)

  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        'username': ['', Validators.required],
        'password': ['secret', Validators.required]
      }
    )
  }

  openSnackBar(message: string, actionText: string, actionButtonColor: 'primary' | 'accent' | 'warn') {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000, //milliseconds for snackbar to stay open
      data: {
        message,
        actionText,
        actionButtonColor
      }
    });
  }

  login() {
    const username = this.loginForm.get('username')?.value.trim()
    const password = this.loginForm.get('password')?.value.trim()
    const userCredentials: UserCredentials = { username, password }
    this.loginService.loginForNonceSession$(userCredentials)
      .subscribe({
        next: nonceSession => {
          console.log(nonceSession)
          this.router.navigate(['/', 'otp'])
        },
        error: err => {
          console.error(err)
          this.openSnackBar(err.error.detail, 'OK', 'warn')
        }
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
