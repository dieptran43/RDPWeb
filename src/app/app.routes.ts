import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthService } from './core/services/cuppaOAuth/auth.service';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { PreloadSelectedModules } from './selective-preload-strategy';

const routes: Routes = [
    { path: '', redirectTo: "rdp-portal", pathMatch: "full" },
    { path: 'rdp-portal', loadChildren: "./rdp-portal/main.module#MainModule" },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthService],
        children: [
            {
                path: '',
                canActivateChild: [AuthService],
                children: [
                    {
                        path: '',
                        component: AdminDashboardComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        PreloadSelectedModules
    ]
})
export class AppRoutingModule { }
