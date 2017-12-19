import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { BillpaymentComponent } from './billpayment/billpayment.component';
import { ComparerrateComponent } from './comparerrate/comparerrate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResSignup1Component } from './res-signup-1/res-signup-1.component';
import { ResSignup2Component } from './res-signup-2/res-signup-2.component';
import { SignupComponent } from './signup/signup.component';
import { Signup1Component } from './signup-1/signup-1.component';
import { Signup2Component } from './signup-2/signup-2.component';
import { Signup3Component } from './signup-3/signup-3.component';
import { RecomendPlanComponent } from './recomend-plan/recomend-plan.component';
import { SigninComponent } from './signin/signin.component';

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
            { path: 'recomend-plan', component: RecomendPlanComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'signup-1', component: Signup1Component },
            { path: 'signup-2', component: Signup2Component },
            { path: 'signup-3', component: Signup3Component },
            { path: 'signin', component: SigninComponent}
        ]
    }
];