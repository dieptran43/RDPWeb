import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from '@progress/kendo-angular-charts';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './shared/top-menu/top-menu.component';
import { BottomMenuComponent } from './shared/bottom-menu/bottom-menu.component';
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

import { SocialLoginModule } from './core/providers/sociallogin.module';
import { AuthenService } from './core/services/authen.service';
import { DataService } from './core/services/data.service';
import { UtilityService } from './core/services/utility.service';
import { AuthServiceConfig } from './core/services/auth-social.service';

import { GoogleLoginProvider } from './core/providers/google-login-provider';
import { FacebookLoginProvider } from './core/providers/facebook-login-provider';
import 'hammerjs';

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
    AppComponent,
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
    BrowserModule,
    HttpModule,
    FormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    AppRoutingModule
  ],
  providers: [
    AuthenService,
    DataService,
    UtilityService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
