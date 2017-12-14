import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { TopMenuComponent } from '../shared/top-menu/top-menu.component';
import { BottomMenuComponent } from '../shared/bottom-menu/bottom-menu.component';
import { HomeComponent } from './home/home.component';
import { routes } from './main.routes';
import { BillpaymentComponent } from './billpayment/billpayment.component';
import { ComparerrateComponent } from './comparerrate/comparerrate.component';

@NgModule({
    declarations: [
        MainComponent,
        TopMenuComponent,
        BottomMenuComponent,
        HomeComponent,
        BillpaymentComponent,
        ComparerrateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class MainModule { }