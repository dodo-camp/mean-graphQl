import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SortComponent } from './sort/sort.component';
import { HistoryComponent } from './history/history.component';

export const componets: any = [
    ProfileComponent,
    NavbarComponent,
    SortComponent,
    HistoryComponent
];

export const componentsMap: any = {
    profile: ProfileComponent,
    history: HistoryComponent
}