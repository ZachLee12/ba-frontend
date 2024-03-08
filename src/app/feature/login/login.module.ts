import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RequestAccountComponent } from './components/request-account/request-account.component';
import { MatStepperModule } from '@angular/material/stepper';
import { TextFieldModule } from '@angular/cdk/text-field';
import { OtpComponent } from './components/otp/otp.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AccountStatusComponent } from './components/account-status/account-status.component';
@NgModule({
  declarations: [
    LoginComponent,
    RequestAccountComponent,
    OtpComponent,
    VerifyEmailComponent,
    AccountStatusComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatStepperModule,
    TextFieldModule,
    QRCodeModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class LoginModule { }
