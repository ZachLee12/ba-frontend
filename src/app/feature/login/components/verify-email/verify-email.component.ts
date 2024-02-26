import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';
import { take } from 'rxjs';
import { LoginService } from 'src/app/core/services/login/login.service';
import { SnackbarComponent } from 'src/app/feature/standalone/snackbar/snackbar.component';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  formBuilder: FormBuilder = inject(FormBuilder)
  loginService: LoginService = inject(LoginService)
  snackBar: MatSnackBar = inject(MatSnackBar)
  verifyEmailForm!: FormGroup;

  ngOnInit() {
    this.verifyEmailForm = this.formBuilder.group({
      username: ['enrico.bissig@gmail.com', Validators.required],
      verificationCode: ['P1WMW0', Validators.required]
    })
  }

  onSubmit() {
    const username = this.verifyEmailForm.get('username')?.value
    const verificationCode = this.verifyEmailForm.get('verificationCode')?.value
    this.loginService.verifyEmailVerificationCode(username, verificationCode)
      .pipe(take(1))
      .subscribe(
        {
          next: response => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: 'Successfuly verified email!',
                actionText: 'yahoo!',
                actionButtonColor: 'primary'
              }
            })
          },
          error: response => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: response.error.detail,
                actionText: 'OK',
                actionButtonColor: 'warn'
              }
            })
          }
        }
      )
  }

}
