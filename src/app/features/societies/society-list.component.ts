
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocietyService } from '../../core/services/society.service';
import { Society } from '../../shared/models/society.model';

@Component({
  selector: 'app-society-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Society Management</h1>
            <p class="text-gray-600">Manage societies and their configurations</p>
          </div>
          
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="mb-4">
                <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Add New Society
                </button>
              </div>
              
              <div *ngIf="societies.length === 0" class="text-gray-500 text-center py-8">
                No societies found. Create your first society to get started.
              </div>
              
              <div *ngIf="societies.length > 0" class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr *ngFor="let society of societies">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ society.name }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ society.address }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button class="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SocietyListComponent implements OnInit {
  societies: Society[] = [];

  constructor(private societyService: SocietyService) {}

  ngOnInit(): void {
    this.loadSocieties();
  }

  private loadSocieties(): void {
    this.societyService.getSocieties().subscribe({
      next: (societies) => {
        this.societies = societies;
      },
      error: (error) => {
        console.error('Error loading societies:', error);
      }
    });
  }
}
