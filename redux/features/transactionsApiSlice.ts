import { createApi } from "@reduxjs/toolkit/query/react";

import {
  GetUserTransactionFeeResponse,
  GetUserTransactionsResponse,
} from "@/types";
import { baseQueryWithReauth } from "./authApiSlice";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserTransactions: builder.query<GetUserTransactionsResponse, void>({
      query: () => "/user/transactions",
    }),

    getUserTransactionByRef: builder.query<GetUserTransactionsResponse, string>(
      {
        query: (ref) => `/user/transactions/references/${ref}`,
      }
    ),

    getUserTransactionFee: builder.query<GetUserTransactionFeeResponse, void>({
      query: () => "/user/transactions/fee",
    }),
  }),
});

export const {
  useGetUserTransactionsQuery,
  useGetUserTransactionFeeQuery,
  useGetUserTransactionByRefQuery,
} = transactionsApi;
