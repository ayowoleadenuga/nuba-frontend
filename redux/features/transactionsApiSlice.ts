import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "@/env";
import { RootState } from "@/redux/store";
import { GetUserTransactionsResponse } from "@/types";
import { baseQueryWithAuth } from "./authApiSlice";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getUserTransactions: builder.query<GetUserTransactionsResponse, void>({
      query: () => "/user/transactions",
    }),
  }),
});

export const { useGetUserTransactionsQuery } = transactionsApi;
