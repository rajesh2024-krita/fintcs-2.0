
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demand',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Monthly Demand Processing</h1>
            <p class="text-gray-600">Process monthly financial demands</p>
          </div>
          
          <div class="bg-white shadow rounded-lg p-6">
            <p class="text-gray-500">Monthly demand processing interface will be implemented here.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DemandComponent {}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';

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
          <div class="py-4">
            <div class="flex justify-between items-center">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">Monthly Demand Processing</h1>
                <p class="text-sm text-gray-600">Process monthly financial calculations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Month/Year Selection -->
        <form [formGroup]="demandForm" class="bg-white p-6 rounded-lg shadow mb-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Month
              </label>
              <select formControlName="month" (change)="loadDemandData()" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Month</option>
                <option *ngFor="let month of months" [value]="month.code">{{ month.name }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select formControlName="year" (change)="loadDemandData()" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Year</option>
                <option *ngFor="let year of years" [value]="year">{{ year }}</option>
              </select>
            </div>

            <div class="flex items-end">
              <button 
                type="button" 
                (click)="createNewMonth()"
                class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                New Month Record
              </button>
            </div>
          </div>
        </form>

        <!-- Tabs -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex">
              <button 
                (click)="activeTab = 'demand'"
                [class]="activeTab === 'demand' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'"
                class="py-2 px-4 border-b-2 font-medium text-sm hover:text-gray-700 hover:border-gray-300"
              >
                Demand
              </button>
              <button 
                (click)="activeTab = 'closing'"
                [class]="activeTab === 'closing' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'"
                class="py-2 px-4 border-b-2 font-medium text-sm hover:text-gray-700 hover:border-gray-300"
              >
                Month Closing
              </button>
            </nav>
          </div>

          <!-- Demand Tab -->
          <div *ngIf="activeTab === 'demand'" class="p-6">
            <!-- Demand Table -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">EDP No</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member Name</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan Amt</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">CD</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interest</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-Loan</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interest</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IntDue</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">P Int</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">P Ded</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">LAS</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Int</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">LASIntDue</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200" formArrayName="demandRows">
                  <tr *ngFor="let row of demandRows.controls; let i = index" [formGroupName]="i">
                    <td class="px-4 py-2">
                      <input type="text" formControlName="edpNo" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="text" formControlName="memberName" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="number" formControlName="loanAmt" (input)="calculateRowTotal(i)" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="number" formControlName="cd" (input)="calculateRowTotal(i)" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="number" formControlName="loan" (input)="calculateRowTotal(i)" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="number" formControlName="interest" (input)="calculateRowTotal(i)" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="number" formControlName="eLoan" (input)="calculateRowTotal(i)" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="number" formControlName="interestExtra" (input)="calculateRowTotal(i)" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="number" formControlName="net" (input)="calculateRowTotal(i)" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="number" formControlName="intDue" (input)="calculateRowTotal(i)" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="number" formControlName="pInt" (input)="calculateRowTotal(i)" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="number" formControlName="pDed" (input)="calculateRowTotal(i)" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="number" formControlName="las" (input)="calculateRowTotal(i)" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="number" formControlName="int" (input)="calculateRowTotal(i)" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                    <td class="px-4 py-2">
                      <input type="number" formControlName="lasIntDue" (input)="calculateRowTotal(i)" class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Totals -->
            <div class="mt-6 bg-gray-50 p-4 rounded-lg">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Total No. of Members</label>
                  <input type="number" [value]="totalMembers" readonly class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Total Amount</label>
                  <input type="number" [value]="totalAmount" readonly class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-6 flex gap-3">
              <button type="button" (click)="exportExcel()" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Export Excel
              </button>
              <button type="button" (click)="printDemand()" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Print
              </button>
              <button type="button" (click)="saveDemand()" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Save
              </button>
              <button type="button" (click)="clearDemand()" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                Clear
              </button>
              <button type="button" (click)="resetDemand()" class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                Reset
              </button>
            </div>
          </div>

          <!-- Month Closing Tab -->
          <div *ngIf="activeTab === 'closing'" class="p-6">
            <div class="text-center text-gray-500">
              <p>Month closing functionality will be implemented here</p>
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
    // Generate years from 2000 to 2050
    for (let year = 2000; year <= 2050; year++) {
      this.years.push(year);
    }

    this.demandForm = this.fb.group({
      month: [''],
      year: [new Date().getFullYear()],
      demandRows: this.fb.array([])
    });

    this.initializeDemandRows();
  }

  ngOnInit() {
    // Set current month
    const currentMonth = new Date().getMonth();
    const monthCode = this.months[currentMonth].code;
    this.demandForm.patchValue({ month: monthCode });
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
      const rowTotal = this.calculateRowTotalValue(row.value);
      total += rowTotal;
    });
    return total;
  }

  initializeDemandRows() {
    // Add sample rows - replace with actual member data
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

  calculateRowTotal(index: number) {
    const row = this.demandRows.at(index);
    const total = this.calculateRowTotalValue(row.value);
    row.patchValue({ totalAmount: total });
  }

  calculateRowTotalValue(rowData: any): number {
    const values = [
      'loanAmt', 'cd', 'loan', 'interest', 'eLoan', 'interestExtra',
      'net', 'intDue', 'pInt', 'pDed', 'las', 'int', 'lasIntDue'
    ];
    
    return values.reduce((total, field) => total + (rowData[field] || 0), 0);
  }

  loadDemandData() {
    const month = this.demandForm.get('month')?.value;
    const year = this.demandForm.get('year')?.value;
    
    if (month && year) {
      console.log(`Loading demand data for ${month} ${year}`);
      // Load data from backend based on month/year
    }
  }

  createNewMonth() {
    if (confirm('Create new month record? This will initialize fresh data.')) {
      // Clear existing data and create fresh rows
      this.demandRows.clear();
      this.initializeDemandRows();
      alert('New month record created!');
    }
  }

  exportExcel() {
    alert('Export to Excel functionality will be implemented');
  }

  printDemand() {
    alert('Print functionality will be implemented');
  }

  saveDemand() {
    if (this.demandForm.valid) {
      const formData = this.demandForm.value;
      console.log('Saving demand data:', formData);
      alert('Demand data saved successfully!');
    }
  }

  clearDemand() {
    if (confirm('Clear all demand data?')) {
      this.demandRows.clear();
      this.initializeDemandRows();
    }
  }

  resetDemand() {
    if (confirm('Reset demand data to original values?')) {
      this.loadDemandData();
    }
  }
}
