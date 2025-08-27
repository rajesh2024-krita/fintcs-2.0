import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { User, UserRole } from '../../shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Navigation Header -->
      <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-2xl font-bold text-gray-900">Fintcs</h1>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-700">Welcome, {{ currentUser?.name }}</span>
              <span class="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                {{ currentUser?.role }}
              </span>
              <button
                (click)="logout()"
                class="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <!-- Dashboard Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center">
                      <span class="text-white text-sm font-bold">S</span>
                    </div>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Total Societies</dt>
                      <dd class="text-lg font-medium text-gray-900">{{ dashboardStats.totalSocieties }}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span class="text-white text-sm font-bold">U</span>
                    </div>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                      <dd class="text-lg font-medium text-gray-900">{{ dashboardStats.totalUsers }}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span class="text-white text-sm font-bold">M</span>
                    </div>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Total Members</dt>
                      <dd class="text-lg font-medium text-gray-900">{{ dashboardStats.totalMembers }}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                      <span class="text-white text-sm font-bold">L</span>
                    </div>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">Active Loans</dt>
                      <dd class="text-lg font-medium text-gray-900">{{ dashboardStats.activeLoans }}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <!-- Super Admin Actions -->
                <ng-container *ngIf="isSuperAdmin">
                  <button
                    (click)="navigateTo('/societies')"
                    class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <h4 class="font-medium text-gray-900">Manage Societies</h4>
                    <p class="text-sm text-gray-500 mt-1">Create and manage societies</p>
                  </button>

                  <button
                    (click)="navigateTo('/users')"
                    class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <h4 class="font-medium text-gray-900">Manage Users</h4>
                    <p class="text-sm text-gray-500 mt-1">Create and manage all users</p>
                  </button>
                </ng-container>

                <!-- Society Admin Actions -->
                <ng-container *ngIf="isSocietyAdmin">
                  <button
                    (click)="navigateTo('/members')"
                    class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <h4 class="font-medium text-gray-900">Manage Members</h4>
                    <p class="text-sm text-gray-500 mt-1">Add and manage society members</p>
                  </button>

                  <button
                    (click)="navigateTo('/loans')"
                    class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <h4 class="font-medium text-gray-900">Loan Management</h4>
                    <p class="text-sm text-gray-500 mt-1">Process loan applications</p>
                  </button>
                </ng-container>

                <!-- Common Actions -->
                <button
                  (click)="navigateTo('/demand')"
                  class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <h4 class="font-medium text-gray-900">Monthly Demand</h4>
                  <p class="text-sm text-gray-500 mt-1">Process monthly demands</p>
                </button>

                <button
                  (click)="navigateTo('/vouchers')"
                  class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <h4 class="font-medium text-gray-900">Voucher Entry</h4>
                  <p class="text-sm text-gray-500 mt-1">Create and manage vouchers</p>
                </button>

                <button
                  (click)="navigateTo('/reports')"
                  class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <h4 class="font-medium text-gray-900">Reports</h4>
                  <p class="text-sm text-gray-500 mt-1">View loan and financial reports</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  dashboardStats = {
    totalSocieties: 0,
    totalUsers: 0,
    totalMembers: 0,
    totalLoans: 0,
    activeLoans: 0
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Load dashboard statistics based on user role
    // This is a placeholder - implement actual API calls
    if (this.currentUser?.role === UserRole.SuperAdmin) {
      this.dashboardStats = {
        totalSocieties: 3,
        totalUsers: 12,
        totalMembers: 85,
        totalLoans: 23,
        activeLoans: 18
      };
    }
  }

  get isSuperAdmin(): boolean {
    return this.authService.hasRole([UserRole.SuperAdmin]);
  }

  get isSocietyAdmin(): boolean {
    return this.authService.hasRole([UserRole.SocietyAdmin]);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout();
  }
}