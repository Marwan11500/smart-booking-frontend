import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/auth.guard';
import { BookingFormComponent } from './booking-form.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '2fa',
        loadComponent: () => import('./components/two-factor.component').then(m => m.TwoFactorComponent)
      }, 
    {
      path: 'my-bookings',
      loadComponent: () => import('./booking-list.component').then(m => m.BookingListComponent)
    },
    {
      path: 'notifications',
      loadComponent: () => import('./notification-list.component').then(m => m.NotificationListComponent)
    },   
    {
      path: 'add-resource',
      loadComponent: () => import('./add-resource.component').then(m => m.AddResourceComponent)
    },
    { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
    { path: 'book', component: BookingFormComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
