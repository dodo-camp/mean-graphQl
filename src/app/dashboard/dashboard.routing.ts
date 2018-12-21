import { Routes } from '@angular/router';
import { componentsMap } from './components/index';
import { DashBoardAuth } from '../authGuard/dashboardAuth/dashboard.auth';

export const routes: Routes = [
    {
        path: '',
        component: componentsMap.profile,
        pathMatch: 'full',
        canActivate: [DashBoardAuth]
    },
    {
        path: 'history',
        component: componentsMap.history,
        canActivate: [DashBoardAuth]
    }
]