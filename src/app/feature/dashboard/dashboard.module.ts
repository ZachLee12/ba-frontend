import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MunicipalityComponent } from './components/municipality/municipality.component';
import { IndicatorsComponent } from './components/indicators/indicators.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [
    HomeComponent,
    MunicipalityComponent,
    IndicatorsComponent,
    DetailsComponent
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
