import { createApi } from "@reduxjs/toolkit/query/react";
import { ReferralsDataResponse } from "@/types";
import { baseQueryWithReauth } from "./authApiSlice";

export const referralsApi = createApi({
  reducerPath: "referralsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getreferrals: builder.query<ReferralsDataResponse, void>({
      query: () => "user/referrals",
    }),
  }),
});

export const { useGetreferralsQuery } = referralsApi;
