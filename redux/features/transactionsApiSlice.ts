import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "@/env";
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

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getUserTransactions: builder.query({
      query: () => "/user/transactions",
    }),
  }),
});

export const { useGetUserTransactionsQuery } = transactionsApi;
