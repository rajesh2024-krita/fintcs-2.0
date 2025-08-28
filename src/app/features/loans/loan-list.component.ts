
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Loan {
  id: string;
  loanNo: string;
  loanType: string;
  loanDate: string;
  edpNo: string;
  name: string;
  loanAmount: number;
  previousLoan: number;
  netLoan: number;
  installments: number;
  installmentAmount: number;
  purpose: string;
  authorizedBy: string;
  paymentMode: string;
  bankName: string;
  chequeNo?: string;
  chequeDate?: string;
  share: number;
  cd: number;
  lastSalary: number;
  mwf: number;
  payAmount: number;
  status: string;
}

interface LoanType {
  id: string;
  name: string;
}

interface Bank {
  id: string;
  name: string;
}

@Component({
  selector: 'app-loan-list',
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
                <h1 class="text-2xl font-bold text-gray-900">Loan Management</h1>
                <p class="text-sm text-gray-600">Manage loans and loan applications</p>
              </div>
              <button
                (click)="showForm = true; resetForm()"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                New Loan
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Loan Form Modal -->
        <div *ngIf="showForm" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">
                {{ editingLoan ? 'Edit Loan' : 'New Loan Entry' }}
              </h3>
            </div>
            
            <form [formGroup]="loanForm" (ngSubmit)="saveLoan()" class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Loan Type -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Loan Type <span class="text-red-500">*</span>
                  </label>
                  <select formControlName="loanTypeId" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Loan Type</option>
                    <option *ngFor="let type of loanTypes" [value]="type.id">{{ type.name }}</option>
                  </select>
                  <div *ngIf="loanForm.get('loanTypeId')?.touched && loanForm.get('loanTypeId')?.errors?.['required']" 
                       class="text-red-500 text-sm mt-1">Loan type is required</div>
                </div>

                <!-- Loan No -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Loan No.
                  </label>
                  <div class="flex gap-2">
                    <input 
                      type="text" 
                      formControlName="loanNo"
                      readonly
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                    />
                    <button type="button" (click)="generateLoanNo()" class="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                      New
                    </button>
                  </div>
                </div>

                <!-- Loan Date -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Loan Date <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    formControlName="loanDate"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- EDP No -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    EDP No. <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    formControlName="edpNo"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Name <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    formControlName="name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Loan Amount -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    formControlName="loanAmount"
                    (input)="calculateNetLoan()"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Previous Loan -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Previous Loan (Remaining)
                  </label>
                  <input 
                    type="number" 
                    formControlName="previousLoan"
                    (input)="calculateNetLoan()"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Net Loan -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Net Loan
                  </label>
                  <input 
                    type="number" 
                    formControlName="netLoan"
                    readonly
                    class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  />
                </div>

                <!-- No. of Installments -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    No. of Installments
                  </label>
                  <input 
                    type="number" 
                    formControlName="installments"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Installment Amount -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Installment Amount
                  </label>
                  <input 
                    type="number" 
                    formControlName="installmentAmount"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Payment Mode -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Payment Mode
                  </label>
                  <div class="flex gap-4">
                    <label class="flex items-center">
                      <input type="radio" formControlName="paymentMode" value="Cash" class="mr-2">
                      Cash
                    </label>
                    <label class="flex items-center">
                      <input type="radio" formControlName="paymentMode" value="Cheque" class="mr-2">
                      Cheque
                    </label>
                    <label class="flex items-center">
                      <input type="radio" formControlName="paymentMode" value="Opening" class="mr-2">
                      Opening
                    </label>
                  </div>
                </div>

                <!-- Bank -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Bank
                  </label>
                  <select formControlName="bankId" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Bank</option>
                    <option *ngFor="let bank of banks" [value]="bank.id">{{ bank.name }}</option>
                  </select>
                </div>

                <!-- Cheque No -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Cheque No.
                  </label>
                  <input 
                    type="text" 
                    formControlName="chequeNo"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Cheque Date -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Cheque Date
                  </label>
                  <input 
                    type="date" 
                    formControlName="chequeDate"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Share -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Share
                  </label>
                  <input 
                    type="number" 
                    formControlName="share"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- CD -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    CD
                  </label>
                  <input 
                    type="number" 
                    formControlName="cd"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Last Salary -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Last Salary
                  </label>
                  <input 
                    type="number" 
                    formControlName="lastSalary"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- MWF -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    MWF
                  </label>
                  <input 
                    type="number" 
                    formControlName="mwf"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Pay Amount -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Pay Amount
                  </label>
                  <input 
                    type="number" 
                    formControlName="payAmount"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Authorized By -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Authorized By
                  </label>
                  <input 
                    type="text" 
                    formControlName="authorizedBy"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Purpose -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Purpose
                  </label>
                  <textarea 
                    formControlName="purpose"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button 
                  type="button" 
                  (click)="validateLoan()"
                  class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Validate
                </button>
                <button 
                  type="button" 
                  (click)="clearForm()"
                  class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Clear
                </button>
                <button 
                  type="button" 
                  (click)="showForm = false"
                  class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
                <button 
                  type="submit" 
                  [disabled]="!loanForm.valid || !isValidated"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {{ editingLoan ? 'Update' : 'Save' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Loans Table -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Loan Records</h3>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan No</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EDP No</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Loan</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let loan of loans">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ loan.loanNo }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ loan.loanType }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ loan.loanDate | date:'short' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ loan.edpNo }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ loan.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{{ loan.loanAmount | number }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{{ loan.netLoan | number }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" 
                          [ngClass]="loan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                      {{ loan.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      (click)="editLoan(loan)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button 
                      (click)="deleteLoan(loan.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr *ngIf="loans.length === 0">
                  <td colspan="9" class="px-6 py-4 text-center text-gray-500">No loans found</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoanListComponent implements OnInit {
  showForm = false;
  editingLoan: Loan | null = null;
  isValidated = false;
  
  loans: Loan[] = [];
  loanTypes: LoanType[] = [];
  banks: Bank[] = [];

  loanForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loanForm = this.fb.group({
      loanTypeId: ['', Validators.required],
      loanNo: [''],
      loanDate: [new Date().toISOString().split('T')[0], Validators.required],
      edpNo: ['', Validators.required],
      name: ['', Validators.required],
      loanAmount: [0, [Validators.required, Validators.min(1)]],
      previousLoan: [0],
      netLoan: [0],
      installments: [0],
      installmentAmount: [0],
      purpose: [''],
      authorizedBy: [''],
      paymentMode: ['Cash'],
      bankId: [''],
      chequeNo: [''],
      chequeDate: [''],
      share: [0],
      cd: [0],
      lastSalary: [0],
      mwf: [0],
      payAmount: [0]
    });
  }

  ngOnInit() {
    this.loadLoanData();
    this.generateLoanNo();
  }

  loadLoanData() {
    // Load sample data - replace with actual API calls
    this.loanTypes = [
      { id: '1', name: 'General' },
      { id: '2', name: 'Personal' },
      { id: '3', name: 'Housing' },
      { id: '4', name: 'Vehicle' },
      { id: '5', name: 'Education' }
    ];

    this.banks = [
      { id: '1', name: 'SBI' },
      { id: '2', name: 'HDFC Bank' },
      { id: '3', name: 'ICICI Bank' },
      { id: '4', name: 'Axis Bank' }
    ];

    this.loans = [
      {
        id: '1',
        loanNo: 'LOAN_000001',
        loanType: 'General',
        loanDate: '2024-01-15',
        edpNo: 'EMP001',
        name: 'John Doe',
        loanAmount: 100000,
        previousLoan: 0,
        netLoan: 100000,
        installments: 12,
        installmentAmount: 8500,
        purpose: 'Personal use',
        authorizedBy: 'Manager',
        paymentMode: 'Cheque',
        bankName: 'SBI',
        share: 5000,
        cd: 2000,
        lastSalary: 50000,
        mwf: 1000,
        payAmount: 95000,
        status: 'Active'
      }
    ];
  }

  generateLoanNo() {
    const nextNum = this.loans.length + 1;
    const loanNo = `LOAN_${nextNum.toString().padStart(6, '0')}`;
    this.loanForm.patchValue({ loanNo });
  }

  calculateNetLoan() {
    const loanAmount = this.loanForm.get('loanAmount')?.value || 0;
    const previousLoan = this.loanForm.get('previousLoan')?.value || 0;
    const netLoan = loanAmount - previousLoan;
    this.loanForm.patchValue({ netLoan });
  }

  validateLoan() {
    if (this.loanForm.valid) {
      this.isValidated = true;
      alert('Loan validated successfully!');
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  saveLoan() {
    if (this.loanForm.valid && this.isValidated) {
      const formData = this.loanForm.value;
      
      if (this.editingLoan) {
        // Update existing loan
        const index = this.loans.findIndex(l => l.id === this.editingLoan!.id);
        if (index !== -1) {
          this.loans[index] = { ...this.editingLoan, ...formData };
        }
      } else {
        // Add new loan
        const newLoan: Loan = {
          id: Date.now().toString(),
          ...formData,
          loanType: this.loanTypes.find(t => t.id === formData.loanTypeId)?.name || '',
          bankName: this.banks.find(b => b.id === formData.bankId)?.name || '',
          status: 'Active'
        };
        this.loans.push(newLoan);
      }

      this.resetForm();
      this.showForm = false;
      alert('Loan saved successfully!');
    }
  }

  editLoan(loan: Loan) {
    this.editingLoan = loan;
    this.loanForm.patchValue(loan);
    this.isValidated = true;
    this.showForm = true;
  }

  deleteLoan(id: string) {
    if (confirm('Are you sure you want to delete this loan?')) {
      this.loans = this.loans.filter(l => l.id !== id);
      alert('Loan deleted successfully!');
    }
  }

  resetForm() {
    this.loanForm.reset();
    this.loanForm.patchValue({
      loanDate: new Date().toISOString().split('T')[0],
      paymentMode: 'Cash',
      loanAmount: 0,
      previousLoan: 0,
      netLoan: 0,
      installments: 0,
      installmentAmount: 0,
      share: 0,
      cd: 0,
      lastSalary: 0,
      mwf: 0,
      payAmount: 0
    });
    this.generateLoanNo();
    this.editingLoan = null;
    this.isValidated = false;
  }

  clearForm() {
    this.resetForm();
  }
}
