
export interface Society {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  fax: string;
  email: string;
  website: string;
  registrationNo: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Interest rates
  dividendRate: number;
  odRate: number;
  cdRate: number;
  loanRate: number;
  emergencyLoanRate: number;
  lasRate: number;
  
  // Limits
  shareLimit: number;
  loanLimit: number;
  emergencyLoanLimit: number;
  
  // Bounce charges
  bounceChargeAmount: number;
  bounceChargeMode: BounceChargeMode;
}

export enum BounceChargeMode {
  ExcessProvision = 'ExcessProvision',
  Cash = 'Cash',
  HDFCBank = 'HDFCBank',
  Inverter = 'Inverter'
}

export interface CreateSocietyRequest {
  name: string;
  address: string;
  city: string;
  phone: string;
  fax: string;
  email: string;
  website: string;
  registrationNo: string;
  dividendRate: number;
  odRate: number;
  cdRate: number;
  loanRate: number;
  emergencyLoanRate: number;
  lasRate: number;
  shareLimit: number;
  loanLimit: number;
  emergencyLoanLimit: number;
  bounceChargeAmount: number;
  bounceChargeMode: BounceChargeMode;
}
