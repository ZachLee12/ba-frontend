import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-request-account',
  templateUrl: './request-account.component.html',
  styleUrls: ['./request-account.component.scss']
})
export class RequestAccountComponent {
  formBuild: FormBuilder = inject(FormBuilder)
  //for textarea autoresizing
  ngZone: NgZone = inject(NgZone)
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  usernameFormGroup = this.formBuild.group({
    username: ['', Validators.required],
  });
  passwordFormGroup = this.formBuild.group({
    password: ['', Validators.required],
  });
  reasonFormGroup = this.formBuild.group({
    reason: ['', Validators.required],
  });

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
