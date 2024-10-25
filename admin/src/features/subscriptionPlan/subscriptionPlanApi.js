import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base URL for API (replace with your server domain)
const serverDomain = import.meta.env.VITE_server_domain;

// Create the subscriptionPlanApi
export const subscriptionPlanApi = createApi({
  reducerPath: "subscriptionPlanApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverDomain}/api/` }),
  endpoints: builder => ({
    // Fetch all subscription plans
    getSubscriptionPlans: builder.query({
      query: () => "SubscriptionPlan",
    }),

    // Fetch subscription plan by ID
    getSubscriptionPlanById: builder.query({
      query: id => `SubscriptionPlan/${id}`,
    }),

    // Create new subscription plan
    createSubscriptionPlan: builder.mutation({
      query: newSubscriptionPlan => ({
        url: "SubscriptionPlan",
        method: "POST",
        body: newSubscriptionPlan,
      }),
    }),

    // Update subscription plan
    updateSubscriptionPlan: builder.mutation({
      query: ({ id, ...updatedSubscriptionPlan }) => ({
        url: `SubscriptionPlan/${id}`,
        method: "PUT",
        body: updatedSubscriptionPlan,
      }),
    }),

    // Delete subscription plan
    deleteSubscriptionPlan: builder.mutation({
      query: id => ({
        url: `SubscriptionPlan/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { useGetSubscriptionPlansQuery, useGetSubscriptionPlanByIdQuery, useCreateSubscriptionPlanMutation, useUpdateSubscriptionPlanMutation, useDeleteSubscriptionPlanMutation } = subscriptionPlanApi;
