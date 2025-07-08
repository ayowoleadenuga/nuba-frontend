import { loginResponseData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SignUpStep {
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
  OTP = "OTP",
  TENANCY_DETAILS = "TENANCY_DETAILS",
  TENANCY_AGREEMENT = "TENANCY_AGREEMENT",
  AGENT_DETAILS = "AGENT_DETAILS",
  NEW_PAYMENT_METHOD = "NEW_PAYMENT_METHOD",
}

interface SignUpState {
  currentStep: SignUpStep;
  formData: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
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
    monthlyRentAmt: string | number;
    tenancyAgreement?: File | null;
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
    referralCode: string;
  };
  token: string | null;
  user: loginResponseData | null;
}

const initialState: SignUpState = {
  currentStep: SignUpStep.CREATE_ACCOUNT,
  formData: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
    homeAddress2: "",
    city: "",
    postCode: "",
    password: "",
    confirmPassword: "",
    otp: "",
    country: "",
    startDate: "",
    endDate: "",
    rentFrequency: "",
    monthlyRentAmt: "",
    tenancyAgreement: null,
    paymentReference: "",
    accountNumber: "",
    accountName: "",
    sortCode: "",
    cardInfo: "",
    monthYear: "",
    cvv: "",
    newAccountNumber: "",
    newCountry: "",
    postalCode: "",
    address1: "",
    address2: "",
    newCity: "",
    state: "",
    cardName: "",
    referralCode: "",
  },
  token: null,
  user: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    nextStep: state => {
      const steps = Object.values(SignUpStep);
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex < steps.length - 1) {
        state.currentStep = steps[currentIndex + 1] as SignUpStep;
      }
    },
    prevStep: state => {
      const steps = Object.values(SignUpStep);
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex > 0) {
        state.currentStep = steps[currentIndex - 1] as SignUpStep;
      }
    },
    setStep: (state, action: PayloadAction<SignUpStep>) => {
      state.currentStep = action.payload;
    },
    updateFormData: (
      state,
      action: PayloadAction<Partial<SignUpState["formData"]>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetSignup: () => initialState,
    setAuthData: (
      state,
      action: PayloadAction<{ token: string; user: loginResponseData }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    updateUserOnboardingStatus: (
      state,
      action: PayloadAction<{ isOnboarded: boolean }>
    ) => {
      if (state.user) {
        state.user.onboarding.isOnboarded = action.payload.isOnboarded;
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  
  },
});

export const {
  nextStep,
  prevStep,
  setStep,
  updateFormData,
  resetSignup,
  setAuthData,
  updateUserOnboardingStatus,
  setToken
} = signupSlice.actions;
export default signupSlice.reducer;
