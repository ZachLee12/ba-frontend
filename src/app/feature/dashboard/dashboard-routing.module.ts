import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MunicipalityComponent } from './components/municipality/municipality.component';
import { IndicatorsComponent } from './components/indicators/indicators.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
    {
        path: 'dashboard',
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'municipalities',
                component: MunicipalityComponent
            },
            {
                path: 'indicators',
                component: IndicatorsComponent
            },
            {
                path: 'details/:municipality',
                component: DetailsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
