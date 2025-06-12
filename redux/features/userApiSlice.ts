import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserProfileDetailsResponse } from "@/types";
import { baseQueryWithReauth } from "./authApiSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Payments"],
  endpoints: builder => ({
    getUserProfile: builder.query<UserProfileDetailsResponse, void>({
      query: () => "user/me",
      providesTags: ["User"],
    }),
    updateUserProfile: builder.mutation({
      query: payload => ({
        url: "/user",
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: payload => ({
        url: "/user/change-password",
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} = userApi;
