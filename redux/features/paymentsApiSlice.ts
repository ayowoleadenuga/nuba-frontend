import { createApi } from "@reduxjs/toolkit/query/react";
import { PaymentMethod } from "@/types";
import { baseQueryWithAuth } from "./authApiSlice";

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    getPaymentMethods: builder.query<{ data: PaymentMethod[] }, void>({
      query: () => "/user/payment-methods",
      providesTags: ["Payments"],
    }),
    createPaymentMethod: builder.mutation({
      query: (payload) => ({
        url: "/user/payment-methods",
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["Payments"],
    }),
  }),
});

export const { useGetPaymentMethodsQuery, useCreatePaymentMethodMutation } =
  paymentsApi;
