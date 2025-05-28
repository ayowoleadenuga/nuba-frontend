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
  confirmPassword: string;
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
  cardName: string;
}

export interface loginResponse {
  message: string;
  status: string;
  statusCode: string;
  accessToken: string;
  data: loginResponseData;
}

export interface signUpResponse {
  message: string;
  status: string;
  statusCode: number;
}

export interface loginResponseData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  onboarding: {
    isOnboarded: boolean;
    step: number;
  };
}

export interface sigUpPayload {
  firstName: string;
  lastName: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  dateOfBirth: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface loginPayload {
  email: string;
  password: string;
}

export interface tenancyDetailsResponse {
  id: string;
  country: string;
  start_date: string;
  end_date: string;
  rent_frequency: string;
  monthly_price: number;
  landlord_account_name: string;
  landlord_account_number: string;
  landlord_sort_code: string;
  created_at: string;
  updated_at: number;
}
export interface tenancyDetailsPayload {
  country: string;
  startDate: string;
  endDate: string;
  rentFrequency: string;
  monthlyPrice: number;
}

export interface landlordDetailsPayload {
  accountName: string;
  accountNumber: string;
  sortCode: string;
}

export interface newPaymentPayload {
  country: string;
  postcode: string;
  city: string;
  address: string;
  address_2: string;
  state: string;
  cardName: string;
  cardNumber: string;
  cvc: string;
  mmYY: string;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}
