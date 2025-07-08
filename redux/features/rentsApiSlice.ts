import { createApi } from "@reduxjs/toolkit/query/react";
import {
  GetAllRentsResponse,
  GetRentDetailsResponse,
  newRentPayload,
  tenancyDetailsResponse,
} from "@/types";
import { baseQueryWithReauth } from "./authApiSlice";

export const rentsApi = createApi({
  reducerPath: "rentsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getUserRents: builder.query<GetAllRentsResponse, void>({
      query: () => "/user/rents",
    }),

    getUserRentsDetails: builder.query<GetRentDetailsResponse, string>({
      query: rentId => `/user/rents/${rentId}`,
    }),

    updateRentDueDate: builder.mutation({
      query: ({ rentId, dueDate }) => ({
        url: `/user/rents/${rentId}/due-date`,
        method: "PATCH",
        body: { dueDate },
      }),
    }),
    addNewRent: builder.mutation<tenancyDetailsResponse, newRentPayload>({
      query: payload => ({
        url: "/user/rents",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetUserRentsQuery,
  useLazyGetUserRentsQuery,
  useGetUserRentsDetailsQuery,
  useUpdateRentDueDateMutation,
  useAddNewRentMutation,
} = rentsApi;
