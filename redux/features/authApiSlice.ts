import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "@/env";
import {
  loginPayload,
  loginResponse,
  signUpResponse,
  sigUpPayload,
  tenancyDetailsPayload,
  tenancyDetailsResponse,
} from "@/types";
import { RootState } from "@/redux/store";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: env.NEXT_PUBLIC_API_URL_NUBA,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).signup.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    registerUser: builder.mutation<signUpResponse, sigUpPayload>({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    sendOTP: builder.mutation({
      query: (payload) => ({
        url: "/auth/email/verify",
        method: "POST",
        body: payload,
      }),
    }),
    resendOTP: builder.mutation({
      query: (payload) => ({
        url: "/auth/email/verification-link",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation<loginResponse, loginPayload>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    registerTenancyDetails: builder.mutation<
      tenancyDetailsResponse,
      tenancyDetailsPayload
    >({
      query: (payload) => ({
        url: "/user/onboarding/rent-details",
        method: "PATCH",
        body: payload,
      }),
    }),
    uploadTenancyAgreement: builder.mutation({
      query: (formData: FormData) => ({
        url: "/user/onboarding/tenancy-agreement",
        method: "POST",
        body: formData,
      }),
    }),
    uploadLandlordDetails: builder.mutation({
      query: (payload) => ({
        url: "/user/onboarding/landlord-details",
        method: "PATCH",
        body: payload,
      }),
    }),
    uploadNewPaymentMethod: builder.mutation({
      query: (payload) => ({
        url: "/user/onboarding/payment-methods",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useSendOTPMutation,
  useLoginMutation,
  useRegisterTenancyDetailsMutation,
  useUploadTenancyAgreementMutation,
  useUploadLandlordDetailsMutation,
  useUploadNewPaymentMethodMutation,
  useResendOTPMutation,
  useLogoutMutation,
} = authApi;
