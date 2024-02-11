import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';

const routes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: 'create-user',
                component: CreateUserComponent
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
