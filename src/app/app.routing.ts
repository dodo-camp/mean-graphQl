import { Routes } from '@angular/router';
import { DashBoardAuth } from './authGuard/dashboardAuth/dashboard.auth';

export const routes: Routes = [
    {
        path: '',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
    },
    {
        path: 'dashboard/:username',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [DashBoardAuth]
    }
]