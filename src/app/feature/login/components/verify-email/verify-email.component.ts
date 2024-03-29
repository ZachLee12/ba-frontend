import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LoginService } from 'src/app/core/services/login/login.service';
import { SnackbarComponent } from 'src/app/feature/standalone/snackbar/snackbar.component';

// VerifyEmailComponent provides the view of a form for users to submit their email and verification code
// to verify their emails.
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
    this.loginService.verifyEmailVerificationCode$(username, verificationCode)
      .pipe(take(1))
      .subscribe(
        {
          next: response => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: 'Successfuly verified email!',
                actionText: 'hooray!',
                actionButtonColor: 'primary'
              }
            })
            this.router.navigate(['/', 'login'])
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
