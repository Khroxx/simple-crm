import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    // { path: '', component: LandingPageComponent, pathMatch: 'full' },
    { path: 'dashboard', component:  DashboardComponent},
    { path: 'user', component:  UserComponent},
];
