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
  endpoints: (builder) => ({
    getreferrals: builder.query<ReferralsDataResponse, ReferralsParams>({
      query: ({ startDate, endDate, query }) => {
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
