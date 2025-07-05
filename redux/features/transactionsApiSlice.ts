import { createApi } from "@reduxjs/toolkit/query/react";

import {
  GetUserTransactionFeeResponse,
  GetUserTransactionsResponse,
} from "@/types";
import { baseQueryWithReauth } from "./authApiSlice";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getUserTransactions: builder.query<GetUserTransactionsResponse, void>({
      query: () => "/user/transactions",
    }),

    getUserTransactionByRef: builder.query<GetUserTransactionsResponse, string>(
      {
        query: ref => `/user/transactions/references/${ref}`,
      }
    ),

    getUserTransactionFee: builder.query<GetUserTransactionFeeResponse, string>(
      {
        query: (paymentId: string) => `/user/rent-payments/${paymentId}/fee`,
      }
    ),
  }),
});

export const {
  useGetUserTransactionsQuery,
  useGetUserTransactionFeeQuery,
  useGetUserTransactionByRefQuery,
} = transactionsApi;
