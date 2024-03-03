import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, NgZone, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    username: ['leezhengyang22@gmail.com'],
  });
  reasonFormGroup = this.formBuild.group({
    reason: ['supercoolreason', Validators.required],
  });

  ngOnInit() {

  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  getFormValues() {
    return {
      ...this.usernameFormGroup.value,
      ...this.reasonFormGroup.value
    }
  }

  submitForm() {
    const requestAccountUser = {
      username: this.usernameFormGroup.get<string>('username')?.value.trim(),
      reason: this.reasonFormGroup.get<string>('reason')?.value.trim()
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
