
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
            <p class="text-gray-600">Manage system users and their roles</p>
          </div>
          
          <div class="bg-white shadow rounded-lg p-6">
            <div class="mb-4">
              <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Add New User
              </button>
            </div>
            <p class="text-gray-500">User management interface will be implemented here.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserListComponent {}
