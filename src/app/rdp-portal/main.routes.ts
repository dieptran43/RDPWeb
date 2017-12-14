import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: MainComponent, children:[
        { path: '', redirectTo: 'index', pathMatch: 'full' },
        { path: 'index', component: HomeComponent },
        // { path: 'compare-rate', component: Name2Component },
        // { path: 'dashboard', component: Name2Component },
        // { path: 'pillpayment', component: Name2Component },
        // { path: 'recomend-plan', component: Name2Component },
        // { path: 'signup', component: Name2Component }

    ] }    
];