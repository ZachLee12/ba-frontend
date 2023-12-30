import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class DashboardModule { }
