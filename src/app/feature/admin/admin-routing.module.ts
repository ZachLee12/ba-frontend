import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ApproveUsersComponent } from './components/approve-users/approve-users.component';

const routes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: 'create-user/:username',
                component: CreateUserComponent
            },
            {
                path: 'approve-users',
                component: ApproveUsersComponent
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
