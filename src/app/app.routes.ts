
import { Routes } from '@angular/router';
import { UserRole } from './shared/models/user.model';
import { authGuard, roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'societies',
    loadComponent: () => import('./features/societies/society-list.component').then(c => c.SocietyListComponent),
    canActivate: [authGuard, roleGuard([UserRole.SuperAdmin])]
  },
  {
    path: 'users',
    loadComponent: () => import('./features/users/user-list.component').then(c => c.UserListComponent),
    canActivate: [authGuard, roleGuard([UserRole.SuperAdmin, UserRole.SocietyAdmin])]
  },
  {
    path: 'members',
    loadComponent: () => import('./features/members/member-list.component').then(c => c.MemberListComponent),
    canActivate: [authGuard, roleGuard([UserRole.SuperAdmin, UserRole.SocietyAdmin])]
  },
  {
    path: 'loans',
    loadComponent: () => import('./features/loans/loan-list.component').then(c => c.LoanListComponent),
    canActivate: [authGuard, roleGuard([UserRole.SuperAdmin, UserRole.SocietyAdmin, UserRole.User])]
  },
  {
    path: 'demand',
    loadComponent: () => import('./features/demand/demand.component').then(c => c.DemandComponent),
    canActivate: [authGuard, roleGuard([UserRole.SuperAdmin, UserRole.SocietyAdmin, UserRole.User])]
  },
  {
    path: 'vouchers',
    loadComponent: () => import('./features/vouchers/voucher-list.component').then(c => c.VoucherListComponent),
    canActivate: [authGuard, roleGuard([UserRole.SuperAdmin, UserRole.SocietyAdmin, UserRole.User])]
  },
  {
    path: 'reports',
    loadComponent: () => import('./features/reports/loan-report.component').then(c => c.LoanReportComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
