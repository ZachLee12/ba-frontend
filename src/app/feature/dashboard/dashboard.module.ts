import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule
  ]
})
export class DashboardModule { }
