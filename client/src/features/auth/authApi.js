import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serverDomain = import.meta.env.VITE_server_domain;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverDomain}/api/` }),
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState().auth.token;
  //   if (token) {
  //     headers.set("Authorization", Bearer ${token});
  //   }
  //   return headers;
  // },
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: body => ({
        url: "/Auth",
        method: "POST",
        body, // FormData object with image
        headers: {},
      }),
    }),
    login: builder.mutation({
      query: body => ({
        url: "/Auth/Login",
        method: "POST",
        body,
      }),
    }),
    getProfile: builder.query({
      query: () => "/profile",
    }),
  }),
});

export const { useRegisterUserMutation, useLoginMutation, useGetProfileQuery } = authApi;
