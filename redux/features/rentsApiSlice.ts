import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllRentsResponse, GetRentDetailsResponse } from "@/types";
import { baseQueryWithReauth } from "./authApiSlice";

export const rentsApi = createApi({
  reducerPath: "rentsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserRents: builder.query<GetAllRentsResponse, void>({
      query: () => "/user/rents",
    }),

    getUserRentsDetails: builder.query<GetRentDetailsResponse, string>({
      query: (rentId) => `/user/rents/${rentId}`,
    }),

    updateRentDueDate: builder.mutation({
      query: ({ rentId, dueDate }) => ({
        url: `/user/rents/${rentId}/due-date`,
        method: "PATCH",
        body: { dueDate },
      }),
    }),
  }),
});

export const {
  useGetUserRentsQuery,
  useGetUserRentsDetailsQuery,
  useUpdateRentDueDateMutation,
} = rentsApi;
