
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from '@progress/kendo-angular-charts';

import { MainComponent } from './main.component';
import { TopMenuComponent } from '../shared/top-menu/top-menu.component';
import { BottomMenuComponent } from '../shared/bottom-menu/bottom-menu.component';
import { HomeComponent } from './home/home.component';
import { routes } from './main.routes';
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
import { AuthenService } from '../core/services/authen.service';


@NgModule({
    declarations: [
        MainComponent,
        TopMenuComponent,
        BottomMenuComponent,
        HomeComponent,
        BillpaymentComponent,
        ComparerrateComponent,
        DashboardComponent,
        ResSignup1Component,
        ResSignup2Component,
        SignupComponent,
        Signup1Component,
        Signup2Component,
        Signup3Component,
        RecomendPlanComponent,
        SigninComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ChartsModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [AuthenService],
})
export class MainModule { }