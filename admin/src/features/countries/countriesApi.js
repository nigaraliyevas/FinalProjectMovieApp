import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const serverDomain = import.meta.env.VITE_server_domain;

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverDomain}/api/` }),
  endpoints: builder => ({
    getCountries: builder.query({
      query: () => "Country",
    }),
    getCountryById: builder.query({
      query: id => `Country/${id}`,
    }),
    createCountry: builder.mutation({
      query: newCountry => ({
        url: "Country",
        method: "POST",
        body: newCountry,
      }),
    }),
    updateCountry: builder.mutation({
      query: ({ id, ...updatedCountry }) => ({
        url: `Country/${id}`,
        method: "PUT",
        body: updatedCountry,
      }),
    }),
    deleteCountry: builder.mutation({
      query: id => ({
        url: `Country/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetCountryByIdQuery,
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation
} = countriesApi;
