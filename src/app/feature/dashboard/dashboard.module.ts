import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MunicipalityComponent } from './components/municipality/municipality.component';
import { IndicatorComponent } from './components/indicator/indicator.component';

@NgModule({
  declarations: [
    HomeComponent,
    MunicipalityComponent,
    IndicatorComponent
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
