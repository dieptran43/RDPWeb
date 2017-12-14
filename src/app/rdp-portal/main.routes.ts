import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { BillpaymentComponent } from './billpayment/billpayment.component';
import { ComparerrateComponent } from './comparerrate/comparerrate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResSignup1Component } from './res-signup-1/res-signup-1.component';
import { ResSignup2Component } from './res-signup-2/res-signup-2.component';

export const routes: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'index', component: HomeComponent },
            { path: 'billpayment', component: BillpaymentComponent },
            { path: 'comparerate', component: ComparerrateComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'res-signup-1', component: ResSignup1Component },
            { path: 'res-signup-2', component: ResSignup2Component },
            // { path: 'pillpayment', component: Name2Component },
            // { path: 'recomend-plan', component: Name2Component },
            // { path: 'signup', component: Name2Component }
        ]
    }
];