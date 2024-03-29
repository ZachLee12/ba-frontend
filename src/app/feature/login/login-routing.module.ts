import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { loggedInGuard } from 'src/app/core/guards/logged-in/logged-in.guard';
import { RequestAccountComponent } from './components/request-account/request-account.component';
import { OtpComponent } from './components/otp/otp.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loggedInGuard]
    },
    {
        path: 'otp',
        component: OtpComponent
    },
    {
        path: 'request-account',
        component: RequestAccountComponent
    },
    {
        path: 'verify-email',
        component: VerifyEmailComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
