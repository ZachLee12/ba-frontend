import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, NgZone, ViewChild, inject } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounce, debounceTime, distinctUntilChanged, fromEvent, switchMap, take, tap } from 'rxjs';
import { LoginService } from 'src/app/core/services/login/login.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SnackbarComponent } from 'src/app/feature/standalone/snackbar/snackbar.component';
import { RequestAccountUser } from 'src/app/interfaces/user.interfaces';


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

  //for textarea autoresizing
  ngZone: NgZone = inject(NgZone)
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  isEmailValid: boolean = false
  @ViewChild('emailInput') emailInputRef!: ElementRef;
  showProgressBar: boolean = false
  usernameFormGroup = this.formBuild.group({
    username: ['zhengyang.lee@stud.hslu.ch', Validators.required],
  });
  passwordFormGroup = this.formBuild.group({
    password: ['Popcorn34%', Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)],
  });
  confirmPasswordFormGroup = this.formBuild.group({
    confirmPassword: ['Popcorn34%', Validators.required],
  });


  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

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
    const requestAccountUser = {
      username: this.usernameFormGroup.get<string>('username')?.value.trim(),
      password: this.passwordFormGroup.get<string>('password')?.value.trim()
    }
    this.userService.createRequestAccountUser(requestAccountUser as RequestAccountUser)
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
          },
          error: res => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: {
                message: res.error.detail,
                actionText: 'OK',
                actionButtonColor: 'warn'
              }
            })
          }
        }
      )
  }
}
