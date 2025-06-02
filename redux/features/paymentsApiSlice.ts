import { createApi } from "@reduxjs/toolkit/query/react";
import { PaymentMethod } from "@/types";
import { baseQueryWithAuth } from "./authApiSlice";

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getPaymentMethods: builder.query<{ data: PaymentMethod[] }, void>({
      query: () => "/user/payment-methods",
    }),
  }),
});

export const { useGetPaymentMethodsQuery } = paymentsApi;
