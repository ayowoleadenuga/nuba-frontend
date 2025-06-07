import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./authApiSlice";

export const supportApi = createApi({
  reducerPath: "supportApi",
  baseQuery: baseQueryWithAuth,

  endpoints: (builder) => ({
    createSupportTicket: builder.mutation({
      query: (payload) => ({
        url: "/user/supports",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateSupportTicketMutation } = supportApi;
