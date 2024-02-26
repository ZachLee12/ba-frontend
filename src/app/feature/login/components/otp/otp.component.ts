import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/feature/standalone/dialog/dialog.component';
import { switchMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/feature/standalone/snackbar/snackbar.component';
import { PageLayoutService } from 'src/app/core/services/page-layout/page-layout.service';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  formBuilder: FormBuilder = inject(FormBuilder)
  loginService: LoginService = inject(LoginService)
  pageLayoutService: PageLayoutService = inject(PageLayoutService)
  dialog: MatDialog = inject(MatDialog)
  snackBar: MatSnackBar = inject(MatSnackBar)
  router: Router = inject(Router)

  otpForm: FormGroup = this.formBuilder.group({
    otp: ['', Validators.required]
  })
  qrcodeUrl: string = ''
  showProgressBar: boolean = false

  ngOnInit() {
    this.loginService.getQrCodeUrl().pipe(take(1)).subscribe({
      next: qrcodeUrl => this.qrcodeUrl = qrcodeUrl
    })
  }

  submitOtp() {
    const { otp } = this.otpForm.value
    this.showProgressBar = true
    this.loginService.submitOtp(otp)
      .pipe(
        take(1)
      )
      .subscribe({
        //successfully logged in
        next: token => {
          this.loginService.setTokenInSessionStorage(token)
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 5000, //milliseconds
            data: {
              message: 'Successfully logged in!',
              actionText: 'Hooray!',
              actionButtonColor: 'primary'
            }
          })
          this.router.navigate(['/', 'dashboard', 'home'])
          this.pageLayoutService.openSidenav$()
        },
        error: err => {
          this.showProgressBar = false
          this.otpForm.get('otp')?.setErrors({ invalid: true })
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              message: err.error.detail,
              actionText: 'OK',
              actionButtonColor: 'warn'
            }
          })
        },
        complete: () => this.showProgressBar = false
      })
  }

  openQRCodeDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        qrcodeUrl: this.qrcodeUrl
      }
    })
  }
}
