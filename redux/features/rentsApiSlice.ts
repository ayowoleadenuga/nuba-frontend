import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllRentsResponse, GetRentDetailsResponse } from "@/types";
import { baseQueryWithAuth } from "./authApiSlice";

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
