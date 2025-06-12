import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./authApiSlice";

export const supportApi = createApi({
  reducerPath: "supportApi",
  baseQuery: baseQueryWithReauth,

  endpoints: builder => ({
    createSupportTicket: builder.mutation({
      query: payload => ({
        url: "/user/supports",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateSupportTicketMutation } = supportApi;
