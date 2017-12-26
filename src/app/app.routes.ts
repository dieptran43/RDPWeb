import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './rdp-portal/home/home.component';
import { BillpaymentComponent } from './rdp-portal/billpayment/billpayment.component';
import { ComparerrateComponent } from './rdp-portal/comparerrate/comparerrate.component';
import { DashboardComponent } from './rdp-portal/dashboard/dashboard.component';
import { ResSignup1Component } from './rdp-portal/res-signup-1/res-signup-1.component';
import { ResSignup2Component } from './rdp-portal/res-signup-2/res-signup-2.component';
import { SignupComponent } from './rdp-portal/signup/signup.component';
import { Signup1Component } from './rdp-portal/signup-1/signup-1.component';
import { Signup2Component } from './rdp-portal/signup-2/signup-2.component';
import { Signup3Component } from './rdp-portal/signup-3/signup-3.component';
import { RecomendPlanComponent } from './rdp-portal/recomend-plan/recomend-plan.component';
import { SigninComponent } from './rdp-portal/signin/signin.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: HomeComponent },
    { path: 'billpayment', component: BillpaymentComponent },
    { path: 'compare-rate', component: ComparerrateComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'res-signup-1', component: ResSignup1Component },
    { path: 'res-signup-2', component: ResSignup2Component },
    { path: 'recomend-plan', component: RecomendPlanComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signup-1', component: Signup1Component },
    { path: 'signup-2', component: Signup2Component },
    { path: 'signup-3', component: Signup3Component },
    { path: 'signin', component: SigninComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
