import { createApi } from "@reduxjs/toolkit/query/react";
import { ReferralDataResponse } from "@/types";
import { baseQueryWithReauth } from "./authApiSlice";

export const referralsApi = createApi({
  reducerPath: "referrals",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getreferrals: builder.query<ReferralDataResponse, void>({
      query: () => "user/referrals",
    }),
  }),
});

export const { useGetreferralsQuery } = referralsApi;
