// src/features/genres/genresApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const serverDomain = import.meta.env.VITE_server_domain;
export const planApi = createApi({
  reducerPath: "SubscriptionPlanApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverDomain}/api/` }),
  endpoints: builder => ({
    getSubscriptionPlans: builder.query({
      query: () => "SubscriptionPlan",
    }),
    getSubscriptionPlanById: builder.query({
      query: id => `SubscriptionPlan/${id}`,
    }),
    createSubscriptionPlan: builder.mutation({
      query: newGenre => ({
        url: "SubscriptionPlan",
        method: "POST",
        body: newGenre,
      }),
    }),
    updateSubscriptionPlan: builder.mutation({
      query: ({ id, ...updatedGenre }) => ({
        url: `SubscriptionPlan/${id}`,
        method: "PUT",
        body: updatedGenre,
      }),
    }),
    deleteSubscriptionPlan: builder.mutation({
      query: id => ({
        url: `SubscriptionPlan/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetSubscriptionPlansQuery, useGetSubscriptionPlanByIdQuery, useCreateSubscriptionPlanMutation, useUpdateSubscriptionPlanMutation, useDeleteSubscriptionPlanMutation } = planApi;
