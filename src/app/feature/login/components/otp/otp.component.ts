import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  formBuilder: FormBuilder = inject(FormBuilder)
  loginService: LoginService = inject(LoginService)

  otpForm: FormGroup = this.formBuilder.group({
    otp: ['', Validators.required]
  })

  submitOtp() {
    const { otp } = this.otpForm.value
    this.loginService.submitOtp(otp).subscribe(console.log)
  }
}
