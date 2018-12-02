import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'signIn',
        pathMatch: 'full'
    },
    {
        path: 'signIn',
        component: SignInComponent
    },
    {
        path: 'signUp',
        component: SignUpComponent
    }
]