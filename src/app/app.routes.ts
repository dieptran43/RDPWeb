import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: "rdp-portal", pathMatch: "full"},
    { path: 'rdp-portal', loadChildren: "./rdp-portal/main.module#MainModule" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
