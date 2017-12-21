import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; 
import { HttpModule ,XHRBackend, RequestOptions } from '@angular/http';
import { ChartsModule } from '@progress/kendo-angular-charts';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

import 'hammerjs';
import { AdminModule } from './admin/admin.module';
import { CuppaOAuthModule } from '../app/core/services/cuppaOAuth/cuppaOAuth.module';
import { AuthService } from './core/services/cuppaOAuth/auth.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    AdminModule,
    CuppaOAuthModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
