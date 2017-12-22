
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
import { DataService } from '../core/services/data.service';
import { UtilityService } from '../core/services/utility.service';

import { SocialLoginModule } from '../core/providers/sociallogin.module';
import { AuthServiceConfig } from '../core/services/auth-social.service';
import { GoogleLoginProvider } from '../core/providers/google-login-provider';
import { FacebookLoginProvider } from '../core/providers/facebook-login-provider';

let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("788182042675-8oscd7mlum1v9tord28ov2bap5qr4o9m.apps.googleusercontent.com")
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("128230904509295")
    }
  ]);
  export function provideConfig() {
    return config;
  }

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
        SocialLoginModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [AuthenService, DataService, UtilityService, {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }],
})
export class MainModule { }