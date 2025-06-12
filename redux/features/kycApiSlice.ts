import { createApi } from "@reduxjs/toolkit/query/react";
import { kycResponse, kycStatusResponse } from "@/types";
import { baseQueryWithReauth } from "./authApiSlice";

export const KYCApi = createApi({
  reducerPath: "kycApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: builder => ({
    kycVerification: builder.mutation<
      kycResponse,
      void
      // { kycId: string; payload: paymentInitiationPayload }
    >({
      query: () => ({
        url: `user/kyc/sessions`,
        method: "POST",
        // body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    validateKYC: builder.query<kycStatusResponse, string>({
      query: () => ({
        url: `user/kyc/status`,
      }),
    }),
  }),
});

export const { useKycVerificationMutation, useLazyValidateKYCQuery } = KYCApi;
