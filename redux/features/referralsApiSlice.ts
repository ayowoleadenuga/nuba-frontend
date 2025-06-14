import { createApi } from "@reduxjs/toolkit/query/react";
import { ReferralsDataResponse } from "@/types";
import { baseQueryWithReauth } from "./authApiSlice";

interface ReferralsParams {
  startDate: string;
  endDate: string;
}

export const referralsApi = createApi({
  reducerPath: "referralsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getreferrals: builder.query<ReferralsDataResponse, ReferralsParams | void>({
      query: (params) => {
        if (!params) return "user/referrals";
        const { startDate, endDate } = params;
        let url = `user/referrals?startDate=${startDate}&endDate=${endDate}`;
        return url;
      },
    }),
  }),
});

export const { useGetreferralsQuery } = referralsApi;
