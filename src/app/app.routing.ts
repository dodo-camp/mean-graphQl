import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
    },
    {
        path: 'dashboard/:username',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: '**',
        redirectTo: 'signIn'
    }
]