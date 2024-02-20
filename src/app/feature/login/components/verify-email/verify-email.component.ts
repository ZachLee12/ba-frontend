import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LoginService } from 'src/app/core/services/login/login.service';
import { SnackbarComponent } from 'src/app/feature/standalone/snackbar/snackbar.component';
import { UserEmailVerificationCode } from 'src/app/interfaces/user.interfaces';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  formBuilder: FormBuilder = inject(FormBuilder)
  loginService: LoginService = inject(LoginService)
  snackBar: MatSnackBar = inject(MatSnackBar)
  router: Router = inject(Router)
  verifyEmailForm!: FormGroup;

  ngOnInit() {
    this.verifyEmailForm = this.formBuilder.group({
      username: ['', Validators.required],
      verificationCode: ['', Validators.required]
    })
  }

  onSubmit() {
    const username = this.verifyEmailForm.get('username')?.value
    const verificationCode = this.verifyEmailForm.get('verificationCode')?.value
    this.loginService.verifyEmailVerificationCode(username, verificationCode)
      .pipe(take(1))
      .subscribe(
        {
          next: res => {
            const snackBarData = {
              message: 'Successfully verified email! The SRL Admin will enable your account shortly.',
              actionText: 'Super!',
              actionButtonColor: 'primary'
            }
            this.openSnackBar(snackBarData)
          },
          error: err => {
            const snackBarData = {
              message: err.error.detail,
              actionText: 'OK',
              actionButtonColor: 'warn'
            }
            this.openSnackBar(snackBarData)
          }
        }
      )
  }

  openSnackBar(data: { message: string, actionText: string, actionButtonColor: string }) {
    this.snackBar.openFromComponent(SnackbarComponent, { data })
  }
}
