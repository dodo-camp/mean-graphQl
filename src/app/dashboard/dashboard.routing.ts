import { Routes } from '@angular/router';
import { componentsMap } from './components/index';

export const routes: Routes = [
    {
        path: '',
        component: componentsMap.profile,
        pathMatch: 'full'
    }
]