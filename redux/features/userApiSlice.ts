import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "@/env";
import { RootState } from "@/redux/store";
import { UserProfileDetailsResponse } from "@/types";

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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfileDetailsResponse, void>({
      query: () => "user/me",
      providesTags: ["User"],
    }),
    updateUserProfile: builder.mutation({
      query: (payload) => ({
        url: "/user",
        method: "PUT",
        body: payload,
      }),

      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
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
