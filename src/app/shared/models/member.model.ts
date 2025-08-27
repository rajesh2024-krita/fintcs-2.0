
export interface Member {
  id: string;
  memNo: string;
  name: string;
  fatherHusbandName: string;
  addressOffice: string;
  addressResidence: string;
  city: string;
  phoneOffice: string;
  phoneResidence: string;
  mobile: string;
  designation: string;
  dob: Date;
  dojSociety: Date;
  dojOrg: Date;
  dor?: Date;
  nominee: string;
  nomineeRelation: string;
  openingBalanceShare: number;
  openingBalanceValue: number;
  balanceType: BalanceType;
  bankName: string;
  payableAt: string;
  accountNo: string;
  status: MemberStatus;
  deductions: string[];
  photoUrl?: string;
  signatureUrl?: string;
  societyId: string;
  societyName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum BalanceType {
  Credit = 'Cr',
  Debit = 'Dr',
  CreditDeposit = 'CD'
}

export enum MemberStatus {
  Active = 'Active',
  Deactive = 'Deactive'
}

export interface CreateMemberRequest {
  name: string;
  fatherHusbandName: string;
  addressOffice: string;
  addressResidence: string;
  city: string;
  phoneOffice: string;
  phoneResidence: string;
  mobile: string;
  designation: string;
  dob: Date;
  dojSociety: Date;
  dojOrg: Date;
  dor?: Date;
  nominee: string;
  nomineeRelation: string;
  openingBalanceShare: number;
  openingBalanceValue: number;
  balanceType: BalanceType;
  bankName: string;
  payableAt: string;
  accountNo: string;
  status: MemberStatus;
  deductions: string[];
  societyId: string;
}
