import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminModule } from './admin/admin.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginModule,
    DashboardModule,
    AdminModule
  ]
})
export class FeatureModule { }
