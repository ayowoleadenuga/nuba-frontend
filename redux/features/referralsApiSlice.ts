import { createApi } from "@reduxjs/toolkit/query/react";
import { ReferralsDataResponse } from "@/types";
import { baseQueryWithReauth } from "./authApiSlice";

interface ReferralsParams {
  startDate: string;
  endDate: string;
  query?: string;
}

export const referralsApi = createApi({
  reducerPath: "referralsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getreferrals: builder.query<ReferralsDataResponse, ReferralsParams | void>({
      query: params => {
        if (!params) return "user/referrals";
        const { startDate, endDate, query } = params;
        let url = `user/referrals?startDate=${startDate}&endDate=${endDate}`;
        if (query) {
          url += `&query=${encodeURIComponent(query)}`;
        }
        return url;
      },
    }),
  }),
});

export const { useGetreferralsQuery } = referralsApi;
