import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from 'src/app/core/guards/auth/auth.guard';
import { loggedInGuard } from 'src/app/core/guards/logged-in/logged-in.guard';
import { RequestAccountComponent } from './components/request-account/request-account.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loggedInGuard]
    },
    {
        path: 'request-account',
        component: RequestAccountComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
