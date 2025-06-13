import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./authApiSlice";
import { ContactUsPayload } from "@/types";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    submitContactUsMessage: builder.mutation({
      query: (payload: ContactUsPayload) => ({
        url: "/contacts",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useSubmitContactUsMessageMutation } = contactApi;
