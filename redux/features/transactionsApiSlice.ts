import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "@/env";
import { RootState } from "@/redux/store";
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

    getUserTransactionFee: builder.query<GetUserTransactionFeeResponse, void>({
      query: () => "/user/transactions/fee",
    }),
  }),
});

export const { useGetUserTransactionsQuery, useGetUserTransactionFeeQuery } =
  transactionsApi;
