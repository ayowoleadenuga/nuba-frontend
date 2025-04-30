import { JSX } from "react";

export type RevolutioniseListType = {
  type: string;
  price: string;
  button: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  height: string;
  bgUrl: string;
  color: string;
};

export interface ContactState {
  fullName: string;
  phoneNumber: string;
  email: string;
  message: string;
  selectedFile: File | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}
export interface SupportCenterState {
  fullName: string;
  email: string;
  issue: string;
}

export interface SettingsState {
  fullName: string;
  email: string;
  phoneNumber: string;
  rentAddress: string;
  rentAmount: string;
  leaseDuration: string;
  landlordName: string;
  landlordbankDetails: string;
  preferredPaymnetMethod: string;
  rentDueDate: Date | null;
  oldPassword: string;
  newPassword: string;
}

export interface FormLoginValue {
  email: string;
  password: string;
}

export interface CreateAccountState {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  homeAddress: string;
  homeAddress2: string;
  city: string;
  postCode: string;
  password: string;
  confirmPassword: string;
  otp: string;
  country: string;
  startDate: string;
  endDate: string;
  rentFrequency: string;
  monthlyRentAmt: string;
  agreement: boolean;
  paymentReference: string;
  accountNumber: string;
  accountName: string;
  sortCode: string;
  cardInfo: string;
  monthYear: string;
  cvv: string;
  newAccountNumber: string;
  newCountry: string;
  postalCode: string;
  address1: string;
  address2: string;
  newCity: string;
  state: string;
}
