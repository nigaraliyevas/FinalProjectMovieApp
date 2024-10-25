// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const serverDomain = import.meta.env.VITE_server_domain;

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({ baseUrl: `${serverDomain}/api/` }),
//   // prepareHeaders: (headers, { getState }) => {
//   //   const token = getState().auth.token;
//   //   if (token) {
//   //     headers.set("Authorization", Bearer ${token});
//   //   }
//   //   return headers;
//   // },
//   endpoints: builder => ({
//     registerUser: builder.mutation({
//       query: body => ({
//         url: "/Auth",
//         method: "POST",
//         body, // FormData object with image
//         headers: {},
//       }),
//     }),
//     login: builder.mutation({
//       query: body => ({
//         url: "/Auth/Login",
//         method: "POST",
//         body,
//       }),
//     }),
//     getProfile: builder.query({
//       query: () => "/profile",
//     }),
//   }),
// });

// export const { useRegisterUserMutation, useLoginMutation, useGetProfileQuery } = authApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serverDomain = import.meta.env.VITE_server_domain;
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverDomain}/api/` }),
  endpoints: builder => ({
    // Registration (for both free and premium, but premium needs to wait for payment)
    registerUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: "/Auth",
        method: "POST",
        body: {
          ...body,
          subscriptionPlanId: id, // Include the subscription ID in the body
        },
        headers: {},
      }),
    }),

    // Login endpoint
    login: builder.mutation({
      query: body => ({
        url: "/Auth/Login",
        method: "POST",
        body,
      }),
    }),
    // Payment session creation (for premium plan)
    createCheckoutSession: builder.mutation({
      query: email => ({
        url: "/Auth/create-checkout-session",
        method: "POST",
        body: { email },
      }),
    }),
    // Payment success handler (after Stripe confirms the payment)
    paymentSuccess: builder.mutation({
      query: sessionId => ({
        url: "/Auth/payment-success",
        method: "POST",
        body: { sessionId }, // Adjusted payload structure
      }),
    }),

    getProfile: builder.query({
      query: () => "/profile",
    }),
    watchMovie: builder.mutation({
      query: userId => ({
        url: `/Auth/watch-movie/${userId}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginMutation, useCreateCheckoutSessionMutation, usePaymentSuccessMutation, useGetProfileQuery, useWatchMovieMutation } = authApi;
