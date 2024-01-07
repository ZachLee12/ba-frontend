import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MunicipalityComponent } from './components/municipality/municipality.component';
import { IndicatorComponent } from './components/indicator/indicator.component';

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
                component: IndicatorComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
