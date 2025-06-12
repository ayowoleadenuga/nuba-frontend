import { createApi } from "@reduxjs/toolkit/query/react";
import {
  autoPayToggleResponse,
  discountResponse,
  paymentInitiationPayload,
  PaymentMethod,
  paymentResponse,
  upcomingRentResponse,
} from "@/types";
import { baseQueryWithReauth } from "./authApiSlice";

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Payments", "User"],
  endpoints: builder => ({
    getPaymentMethods: builder.query<{ data: PaymentMethod[] }, void>({
      query: () => "/user/payment-methods",
      providesTags: ["Payments"],
    }),
    createPaymentMethod: builder.mutation({
      query: payload => ({
        url: "/user/payment-methods",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Payments"],
    }),
    makePayment: builder.mutation<
      paymentResponse,
      { paymentId: string; payload: paymentInitiationPayload }
    >({
      query: ({ paymentId, payload }) => ({
        url: `user/rent-payments/${paymentId}/pay`,
        method: "POST",
        body: payload,
      }),
    }),

    validatePayment: builder.mutation<paymentResponse, string>({
      query: payload => ({
        url: `user/transactions/validate`,
        method: "POST",
        body: { id: payload },
      }),
    }),
    getUpcomingRentPayment: builder.query<upcomingRentResponse, string>({
      query: rentId => ({
        url: `user/rents/${rentId}/upcoming-payments`,
      }),
    }),
    getDiscount: builder.query<discountResponse, void>({
      query: () => ({
        url: `user/points/discount`,
      }),
    }),
    toggleAutoPay: builder.mutation<autoPayToggleResponse, boolean | undefined>(
      {
        query: (autoPayStatus: boolean) => ({
          url: `user/autopay/${autoPayStatus ? "disable" : "enable"}`,
          method: "PATCH",
        }),
        invalidatesTags: ["User"],
      }
    ),
  }),
});

export const {
  useGetPaymentMethodsQuery,
  useCreatePaymentMethodMutation,
  useMakePaymentMutation,
  useValidatePaymentMutation,
  useGetUpcomingRentPaymentQuery,
  useGetDiscountQuery,
  useToggleAutoPayMutation,
} = paymentsApi;
