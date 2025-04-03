// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import emailjs from "@emailjs/browser";
// import { nubaApis } from "@/services/api-services";

// const baseQueryforEmailJs = fetchBaseQuery({
//   baseUrl: "/",
// });

// export const nubaApiSlice = createApi({
//     reducerPath: "nubaApi",
//     baseQuery: baseQueryforEmailJs,
//     endpoints: builder => ({
//       sendEmail: builder.mutation({
//         queryFn: async (form: React.RefObject<HTMLFormElement | null>) => {
//           try {
//             await nubaApis.sendEmail(form);
//             return { data: { success: true } };
//           } catch (error) {
//             return { error: { status: "CUSTOM_ERROR", data: error } };
//           }
//         },
//       }),
//     }),
//   });

// export const { useSendEmailMutation } = nubaApiSlice;
