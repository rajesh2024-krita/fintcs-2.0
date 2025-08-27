
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-report',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Loan Reports</h1>
            <p class="text-gray-600">Generate and view loan-related reports</p>
          </div>
          
          <div class="bg-white shadow rounded-lg p-6">
            <div class="mb-4 flex space-x-4">
              <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Generate Report
              </button>
              <button class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Export to PDF
              </button>
            </div>
            <p class="text-gray-500">Loan reporting interface will be implemented here.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoanReportComponent {}
