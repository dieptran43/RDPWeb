import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { BillpaymentComponent } from './billpayment/billpayment.component';

export const routes: Routes = [
    {
        path: '', component: MainComponent, children: [
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'index', component: HomeComponent },
            { path: 'billpayment', component: BillpaymentComponent },
            // { path: 'dashboard', component: Name2Component },
            // { path: 'pillpayment', component: Name2Component },
            // { path: 'recomend-plan', component: Name2Component },
            // { path: 'signup', component: Name2Component }
        ]
    }
];