import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, NgZone, ViewChild, inject } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LoginService } from 'src/app/core/services/login/login.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SnackbarComponent } from 'src/app/feature/standalone/snackbar/snackbar.component';
import { RequestAccountUser } from 'src/app/interfaces/user.interfaces';

// RequestAccountComponent provides the view for a form with steps for a user to request an account with SRL.
@Component({
  selector: 'app-request-account',
  templateUrl: './request-account.component.html',
  styleUrls: ['./request-account.component.scss']
})
export class RequestAccountComponent {
  formBuild: FormBuilder = inject(FormBuilder)
  loginService: LoginService = inject(LoginService)
  userService: UserService = inject(UserService)
  snackBar: MatSnackBar = inject(MatSnackBar)
  router: Router = inject(Router)


  usernameFormGroup = this.formBuild.group({
    username: ['zhengyang.lee@stud.hslu.ch', Validators.required],
  });
  passwordFormGroup = this.formBuild.group({
    password: ['Popcorn34%', Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)],
  });
  confirmPasswordFormGroup = this.formBuild.group({
    confirmPassword: ['Popcorn34%', Validators.required],
  });

  // Whether if the progress bar should be displayed
  showProgressBar: boolean = false

  checkIfPasswordsMatch() {
    const { password } = this.passwordFormGroup.value
    const { confirmPassword } = this.confirmPasswordFormGroup.value

    return password === confirmPassword
  }

  getFormValues() {
    return {
      ...this.usernameFormGroup.value,
      ...this.passwordFormGroup.value
    }
  }

  submitForm() {
    this.showProgressBar = true

    const requestAccountUser = {
      username: this.usernameFormGroup.get<string>('username')?.value.trim(),
      password: this.passwordFormGroup.get<string>('password')?.value.trim()
    }
    this.userService.createRequestAccountUser$(requestAccountUser as RequestAccountUser)
      .pipe(take(1))
      .subscribe(
        {
          next: response => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: `Successfully requested an account for ${this.usernameFormGroup.value.username}`,
                actionText: 'Yay!',
                actionButtonColor: 'primary'
              }
            })

            this.router.navigate(['/', 'login'])
          },
          error: res => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: res.error.detail,
                actionText: 'OK',
                actionButtonColor: 'warn'
              }
            })
            this.showProgressBar = false
          },
          complete: () => {
            this.showProgressBar = false
          }
        }
      )
  }
}
