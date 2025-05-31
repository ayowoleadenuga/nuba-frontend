import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "@/env";
import { RootState } from "@/redux/store";
import { GetAllRentsResponse, GetRentDetailsResponse } from "@/types";

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

export const rentsApi = createApi({
  reducerPath: "rentsApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getUserRents: builder.query<GetAllRentsResponse, void>({
      query: () => "/user/rents",
    }),

    getUserRentsDetails: builder.query<GetRentDetailsResponse, string>({
      query: (rentId) => `/user/rents/${rentId}`,
    }),
  }),
});

export const { useGetUserRentsQuery, useGetUserRentsDetailsQuery } = rentsApi;
