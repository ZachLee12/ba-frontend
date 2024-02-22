import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login/login.service';
import { UserEmailVerificationCode } from 'src/app/interfaces/user.interfaces';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  formBuilder: FormBuilder = inject(FormBuilder)
  loginService: LoginService = inject(LoginService)
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
      .subscribe()
  }

}
