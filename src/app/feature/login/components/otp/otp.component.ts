import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/feature/standalone/dialog/dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  formBuilder: FormBuilder = inject(FormBuilder)
  loginService: LoginService = inject(LoginService)
  dialog: MatDialog = inject(MatDialog)

  otpForm: FormGroup = this.formBuilder.group({
    otp: ['', Validators.required]
  })
  qrcodeUrl: string = ''

  ngOnInit() {
    this.loginService.getQrCodeUrl().pipe(take(1)).subscribe({
      next: qrcodeUrl => this.qrcodeUrl = qrcodeUrl
    })
  }

  submitOtp() {
    const { otp } = this.otpForm.value
    this.loginService.submitOtp(otp).subscribe(console.log)
  }

  openQRCodeDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        qrcodeUrl: this.qrcodeUrl
      }
    })
  }
}
