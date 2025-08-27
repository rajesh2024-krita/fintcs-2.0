
export interface User {
  id: string;
  edpNo: string;
  name: string;
  addressOffice: string;
  addressResidence: string;
  designation: string;
  phoneOffice: string;
  phoneResidence: string;
  mobile: string;
  email: string;
  username: string;
  role: UserRole;
  societyId?: string;
  societyName?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  SuperAdmin = 'SuperAdmin',
  SocietyAdmin = 'SocietyAdmin',
  User = 'User',
  Member = 'Member'
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresAt: Date;
}

export interface CreateUserRequest {
  edpNo: string;
  name: string;
  addressOffice: string;
  addressResidence: string;
  designation: string;
  phoneOffice: string;
  phoneResidence: string;
  mobile: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  societyId?: string;
}
