import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, NgZone, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, fromEvent, switchMap, take, tap } from 'rxjs';
import { LoginService } from 'src/app/core/services/login/login.service';


@Component({
  selector: 'app-request-account',
  templateUrl: './request-account.component.html',
  styleUrls: ['./request-account.component.scss']
})
export class RequestAccountComponent {
  formBuild: FormBuilder = inject(FormBuilder)
  loginService: LoginService = inject(LoginService)
  //for textarea autoresizing
  ngZone: NgZone = inject(NgZone)
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  isEmailValid: boolean = false
  @ViewChild('emailInpit') emailInputRef!: ElementRef;
  showProgressBar: boolean = false
  usernameFormGroup = this.formBuild.group({
    username: ['', Validators.required],
  });
  passwordFormGroup = this.formBuild.group({
    password: ['', Validators.required],
  });
  reasonFormGroup = this.formBuild.group({
    reason: ['', Validators.required],
  });

  ngOnInit() {
    this.usernameFormGroup.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.showProgressBar = true),
        switchMap(({ username }) => this.loginService.verifyEmail(username as string))
      )
      .subscribe(
        {
          next: isEmailValid => {
            console.log(isEmailValid)
            this.showProgressBar = false
            this.isEmailValid = isEmailValid

            //very troublesome way to trigger mat-error on invalid email... find another way
            if (!isEmailValid) {
              this.usernameFormGroup.get('username')?.setErrors({ invalid: true })
            }
          }
        }
      )
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  getFormValues() {
    return {
      ...this.usernameFormGroup.value,
      ...this.passwordFormGroup.value,
      ...this.reasonFormGroup.value
    }
  }

  submitForm() {
    console.log({
      ...this.usernameFormGroup.value,
      ...this.passwordFormGroup.value,
      ...this.reasonFormGroup.value
    })
  }
}
