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
  subject: string;
  message: string;
  name: string;
  email: string;
}

export interface SettingsState {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  rentAddress: string;
  rentAmount: string;
  email: string;
  leaseDuration: string;
  landlordName: string;
  landlordbankDetails: string;
  preferredPaymnetMethod: string;
  rentDueDate: Date | null;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type SettingsErrorState = {
  [K in keyof SettingsState]?: string;
};

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
  id: string;
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
  statistics: {
    rentPaidAmount: string;
    totalRentPaid: number;
    totalReferral: number;
    unitsEarned: string;
    mileStone: number;
    unitBalance: number;
  };
  status: string;
  referralCode: string | null;
  referralLink: string;
  autopay: boolean;
  autopayEnabledAt: Date | string;
  joinedAt: string;
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
  email: string;
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

export interface UpdateUserProfilePayload {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface Landlord {
  accountName: string | null;
  accountNumber: string | null;
  email: string | null;
  sortCode: string | null;
}

export interface Rent {
  id: string;
  country: string;
  startDate: string;
  dueDate: string;
  rentFrequency: string;
  monthlyPrice: number;
  landlord: Landlord;
  agreements: any[];
  createdAt: string;
  updatedAt: string;
}

export interface GetAllRentsResponse {
  status: string;
  statusCode: number;
  data: Rent[];
}

export interface GetRentDetailsResponse {
  status: string;
  statusCode: number;
  data: Rent;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  joinedAt: string;
  referralCode: string | null;
  referralLink: string;
  status: "active" | "inactive";
  autopay: boolean;
  autopayEnabledAt: string;
  onboarding: {
    isOnboarded: boolean;
    step: number;
  };
  statistics: {
    rentPaidAmount: string;
    totalRentPaid: number;
    totalReferral: number;
    unitsEarned: string;
    unitBalance: number;
    mileStone: number;
  };
}

export interface UserProfileDetailsResponse {
  data: UserProfile;
}

export interface Transaction {
  id: number;
  orderId: number;
  user: {
    id: string;
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
    statistics: {
      rentPaidAmount: number;
      totalRentPaid: number;
      totalReferral: number;
      unitsEarned: number;
    };
    status: string;
    joinedAt: string;
  };
  subscription: string;
  service: string;
  paymentId: string;
  transactionNumber: string;
  amount: number;
  status: string;
  cardType: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: {
    first: string;
    last: string;
    prev: string;
    next: string;
  };
}

export interface GetUserTransactionsResponse {
  success: boolean;
  data: Transaction[];
  meta: PaginationMeta;
}

export interface PaymentMethod {
  id: string;
  country: string;
  postcode: string;
  city: string;
  address: string;
  address_2?: null;
  state: string;
  mmYY: string;
  cardName: string;
  lastDigits: string;
  created_at: string;
}

export interface AutoPayOffProps {
  // setMakePayment: React.Dispatch<
  //   React.SetStateAction<"" | "start" | "complete">
  // >;
  setTab: React.Dispatch<
    React.SetStateAction<"" | "autopay-setup" | "include-points">
  >;
}

export interface AutoPayOnProps {
  setTab: React.Dispatch<
    React.SetStateAction<"" | "autopay-setup" | "include-points">
  >;
  // setMakePayment: React.Dispatch<
  //   React.SetStateAction<"" | "start" | "complete">
  // >;
}

interface FaqQuestion {
  question: string;
  answer: string;
  expand: boolean;
}

export interface SupportFaqsContainerProps {
  faqQuestions: FaqQuestion[];
  setFaqQuestions: React.Dispatch<React.SetStateAction<FaqQuestion[]>>;
}

export interface GoogleOAuthUrlResponse {
  message: string;
  status: string;
  statusCode: string;
  data: {
    url: string;
  };
}

export interface CreateSupportTicket {
  subject: string;
  message: string;
  name: string;
  email: string;
}
export interface paymentResponse {
  status: boolean;
  message: string;
  data: {
    token: string;
    reference: string;
    provider: string;
    authorizationUrl: string;
  };
}

export interface upcomingRentPayment {
  id: string;
  rentId: string;
  userId: string;
  amount: number;
  dueDate: string;
  paidDate?: null;
  status: string;
  paymentMethod?: null;
  transactionId?: null;
  notes?: null;
  reminderSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface upcomingRentResponse {
  status: string;
  statusCode: number;
  data: upcomingRentPayment;
}
export interface paymentInitiationPayload {
  usePoints: boolean;
  callbackUrl: string;
  milestone: number | undefined;
}

export interface discountResponse {
  status: string;
  statusCode: number;
  data: {
    point: string;
    discount: number;
    conversionRate: number;
    currency: string;
  };
}

export interface autoPayToggleResponse {
  message: string;
  status: string;
  statusCode: string;
  data: loginResponseData;
}

export interface FAQItem {
  question: string;
  answer: string;
  expand: boolean;
}

export interface SupportFaqsProps {
  faqQuestions: FAQItem[];
  setFaqQuestions: React.Dispatch<React.SetStateAction<FAQItem[]>>;
}
