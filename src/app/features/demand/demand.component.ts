
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

interface DemandRow {
  edpNo: string;
  memberName: string;
  loanAmt: number;
  cd: number;
  loan: number;
  interest: number;
  eLoan: number;
  interestExtra: number;
  net: number;
  intDue: number;
  pInt: number;
  pDed: number;
  las: number;
  int: number;
  lasIntDue: number;
  totalAmount: number;
}

@Component({
  selector: 'app-demand',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="py-6">
            <div class="flex justify-between items-center">
              <div>
                <h1 class="text-3xl font-bold text-gray-900">Monthly Demand Processing</h1>
                <p class="text-sm text-gray-600 mt-2">Manage and process monthly financial demands</p>
              </div>
              <div class="flex items-center space-x-3">
                <div class="bg-blue-50 px-4 py-2 rounded-lg">
                  <span class="text-sm font-medium text-blue-800">Active Month: {{getCurrentMonth()}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Month/Year Selection Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div class="px-6 py-5 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Select Period</h3>
          </div>
          <form [formGroup]="demandForm" class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Month *
                </label>
                <select 
                  formControlName="month" 
                  (change)="loadDemandData()" 
                  class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select Month</option>
                  <option *ngFor="let month of months" [value]="month.code">{{ month.name }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <select 
                  formControlName="year" 
                  (change)="loadDemandData()" 
                  class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select Year</option>
                  <option *ngFor="let year of years" [value]="year">{{ year }}</option>
                </select>
              </div>

              <div class="flex items-end">
                <button 
                  type="button" 
                  (click)="loadDemandData()"
                  [disabled]="!demandForm.get('month')?.value || !demandForm.get('year')?.value"
                  class="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Load Data
                </button>
              </div>

              <div class="flex items-end">
                <button 
                  type="button" 
                  (click)="createNewMonth()"
                  class="w-full px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  New Month
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Main Content Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <!-- Tabs -->
          <div class="border-b border-gray-200 bg-gray-50">
            <nav class="flex">
              <button 
                (click)="activeTab = 'demand'"
                [class]="activeTab === 'demand' ? 'border-blue-500 text-blue-600 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'"
                class="py-4 px-6 border-b-2 font-medium text-sm transition-colors"
              >
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                  </svg>
                  Demand Processing
                </span>
              </button>
              <button 
                (click)="activeTab = 'closing'"
                [class]="activeTab === 'closing' ? 'border-blue-500 text-blue-600 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'"
                class="py-4 px-6 border-b-2 font-medium text-sm transition-colors"
              >
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  Month Closing
                </span>
              </button>
            </nav>
          </div>

          <!-- Demand Tab -->
          <div *ngIf="activeTab === 'demand'" class="p-6">
            <!-- Add Member Button -->
            <div class="mb-6 flex justify-between items-center">
              <div class="flex items-center space-x-4">
                <button 
                  type="button" 
                  (click)="addNewRow()"
                  class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Member
                </button>
              </div>
            </div>

            <!-- Demand Table -->
            <div class="overflow-x-auto border border-gray-200 rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EDP No</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Name</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Amt</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CD</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-Loan</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Int Extra</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Int Due</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P Int</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P Ded</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LAS</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Int</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LAS Int Due</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200" formArrayName="demandRows">
                  <tr *ngFor="let row of demandRows.controls; let i = index" [formGroupName]="i" class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm text-gray-900">{{ i + 1 }}</td>
                    <td class="px-4 py-2">
                      <input 
                        type="text" 
                        formControlName="edpNo" 
                        class="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="EDP"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="text" 
                        formControlName="memberName" 
                        class="w-32 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Member Name"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        formControlName="loanAmt" 
                        (input)="calculateRowTotal(i)" 
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        formControlName="cd" 
                        (input)="calculateRowTotal(i)" 
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        formControlName="loan" 
                        (input)="calculateRowTotal(i)" 
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        formControlName="interest" 
                        (input)="calculateRowTotal(i)" 
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        formControlName="eLoan" 
                        (input)="calculateRowTotal(i)" 
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        formControlName="interestExtra" 
                        (input)="calculateRowTotal(i)" 
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        formControlName="net" 
                        (input)="calculateRowTotal(i)" 
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        formControlName="intDue" 
                        (input)="calculateRowTotal(i)" 
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        formControlName="pInt" 
                        (input)="calculateRowTotal(i)" 
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        formControlName="pDed" 
                        (input)="calculateRowTotal(i)" 
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        formControlName="las" 
                        (input)="calculateRowTotal(i)" 
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        formControlName="int" 
                        (input)="calculateRowTotal(i)" 
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <input 
                        type="number" 
                        formControlName="lasIntDue" 
                        (input)="calculateRowTotal(i)" 
                        class="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      >
                    </td>
                    <td class="px-4 py-2">
                      <div class="w-24 px-2 py-1 bg-gray-50 border border-gray-200 rounded text-sm text-right font-medium">
                        {{ formatCurrency(row.get('totalAmount')?.value || 0) }}
                      </div>
                    </td>
                    <td class="px-4 py-2">
                      <button 
                        type="button" 
                        (click)="removeRow(i)"
                        class="text-red-600 hover:text-red-800 p-1"
                        title="Remove Row"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr *ngIf="demandRows.length === 0">
                    <td colspan="18" class="px-4 py-8 text-center text-gray-500">
                      No members added yet. Click "Add Member" to get started.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Summary Section -->
            <div class="mt-8 bg-gray-50 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Summary</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Total No. of Members</label>
                  <div class="text-2xl font-bold text-blue-600">{{ totalMembers }}</div>
                </div>
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
                  <div class="text-2xl font-bold text-green-600">{{ formatCurrency(totalAmount) }}</div>
                </div>
                <div class="bg-white p-4 rounded-lg border border-gray-200">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Average Amount</label>
                  <div class="text-2xl font-bold text-purple-600">{{ formatCurrency(averageAmount) }}</div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-8 flex flex-wrap gap-3">
              <button 
                type="button" 
                (click)="saveDemand()" 
                class="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                Save Demand
              </button>
              
              <button 
                type="button" 
                (click)="exportExcel()" 
                class="inline-flex items-center px-6 py-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Export Excel
              </button>
              
              <button 
                type="button" 
                (click)="printDemand()" 
                class="inline-flex items-center px-6 py-3 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                </svg>
                Print Report
              </button>
              
              <button 
                type="button" 
                (click)="clearDemand()" 
                class="inline-flex items-center px-6 py-3 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Clear All
              </button>
              
              <button 
                type="button" 
                (click)="resetDemand()" 
                class="inline-flex items-center px-6 py-3 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Reset
              </button>
            </div>
          </div>

          <!-- Month Closing Tab -->
          <div *ngIf="activeTab === 'closing'" class="p-6">
            <div class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Month Closing</h3>
              <p class="mt-1 text-sm text-gray-500">Month closing functionality will be implemented here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DemandComponent implements OnInit {
  activeTab = 'demand';
  demandForm: FormGroup;
  isLoading = false;

  months = [
    { code: 'JAN', name: 'January' },
    { code: 'FEB', name: 'February' },
    { code: 'MAR', name: 'March' },
    { code: 'APR', name: 'April' },
    { code: 'MAY', name: 'May' },
    { code: 'JUN', name: 'June' },
    { code: 'JUL', name: 'July' },
    { code: 'AUG', name: 'August' },
    { code: 'SEP', name: 'September' },
    { code: 'OCT', name: 'October' },
    { code: 'NOV', name: 'November' },
    { code: 'DEC', name: 'December' }
  ];

  years: number[] = [];

  constructor(private fb: FormBuilder) {
    // Generate years from 2020 to 2030
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
      this.years.push(year);
    }

    this.demandForm = this.fb.group({
      month: ['', Validators.required],
      year: [currentYear, Validators.required],
      demandRows: this.fb.array([])
    });
  }

  ngOnInit() {
    // Set current month
    const currentMonth = new Date().getMonth();
    const monthCode = this.months[currentMonth].code;
    this.demandForm.patchValue({ month: monthCode });
    
    // Initialize with sample data
    this.initializeDemandRows();
  }

  get demandRows() {
    return this.demandForm.get('demandRows') as FormArray;
  }

  get totalMembers() {
    return this.demandRows.length;
  }

  get totalAmount() {
    let total = 0;
    this.demandRows.controls.forEach(row => {
      const rowTotal = row.get('totalAmount')?.value || 0;
      total += rowTotal;
    });
    return total;
  }

  get averageAmount() {
    return this.totalMembers > 0 ? this.totalAmount / this.totalMembers : 0;
  }

  getCurrentMonth() {
    const month = this.demandForm.get('month')?.value;
    const year = this.demandForm.get('year')?.value;
    if (month && year) {
      const monthName = this.months.find(m => m.code === month)?.name;
      return `${monthName} ${year}`;
    }
    return 'Not Selected';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  }

  initializeDemandRows() {
    // Add sample rows
    const sampleData = [
      { edpNo: 'EMP001', memberName: 'John Doe' },
      { edpNo: 'EMP002', memberName: 'Jane Smith' },
      { edpNo: 'EMP003', memberName: 'Bob Johnson' }
    ];

    sampleData.forEach(member => {
      this.demandRows.push(this.createDemandRow(member));
    });
  }

  createDemandRow(data: any = {}) {
    return this.fb.group({
      edpNo: [data.edpNo || ''],
      memberName: [data.memberName || ''],
      loanAmt: [0],
      cd: [0],
      loan: [0],
      interest: [0],
      eLoan: [0],
      interestExtra: [0],
      net: [0],
      intDue: [0],
      pInt: [0],
      pDed: [0],
      las: [0],
      int: [0],
      lasIntDue: [0],
      totalAmount: [0]
    });
  }

  addNewRow() {
    this.demandRows.push(this.createDemandRow());
  }

  removeRow(index: number) {
    if (this.demandRows.length > 0) {
      this.demandRows.removeAt(index);
    }
  }

  calculateRowTotal(index: number) {
    const row = this.demandRows.at(index);
    const total = this.calculateRowTotalValue(row.value);
    row.patchValue({ totalAmount: total }, { emitEvent: false });
  }

  calculateRowTotalValue(rowData: any): number {
    const values = [
      'loanAmt', 'cd', 'loan', 'interest', 'eLoan', 'interestExtra',
      'net', 'intDue', 'pInt', 'pDed', 'las', 'int', 'lasIntDue'
    ];
    
    return values.reduce((total, field) => {
      const value = parseFloat(rowData[field]) || 0;
      return total + value;
    }, 0);
  }

  loadDemandData() {
    const month = this.demandForm.get('month')?.value;
    const year = this.demandForm.get('year')?.value;
    
    if (month && year) {
      this.isLoading = true;
      console.log(`Loading demand data for ${month} ${year}`);
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        alert(`Demand data loaded for ${month} ${year}`);
      }, 1000);
    } else {
      alert('Please select both month and year');
    }
  }

  createNewMonth() {
    if (confirm('Create new month record? This will clear existing data and initialize fresh records.')) {
      this.demandRows.clear();
      this.initializeDemandRows();
      alert('New month record created successfully!');
    }
  }

  exportExcel() {
    if (this.demandRows.length === 0) {
      alert('No data to export');
      return;
    }
    
    // Implement Excel export functionality
    console.log('Exporting to Excel...', this.demandForm.value);
    alert('Excel export functionality will be implemented with a library like xlsx');
  }

  printDemand() {
    if (this.demandRows.length === 0) {
      alert('No data to print');
      return;
    }
    
    // Implement print functionality
    window.print();
  }

  saveDemand() {
    if (this.demandForm.valid && this.demandRows.length > 0) {
      const formData = this.demandForm.value;
      console.log('Saving demand data:', formData);
      
      // Simulate API call
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        alert('Demand data saved successfully!');
      }, 1000);
    } else {
      alert('Please fill in the required fields and add at least one member');
    }
  }

  clearDemand() {
    if (confirm('Are you sure you want to clear all demand data? This action cannot be undone.')) {
      this.demandRows.clear();
      alert('All demand data cleared');
    }
  }

  resetDemand() {
    if (confirm('Reset demand data to original values? Any unsaved changes will be lost.')) {
      this.demandRows.clear();
      this.initializeDemandRows();
      alert('Demand data reset to original values');
    }
  }
}
