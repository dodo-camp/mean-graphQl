import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
    }
]