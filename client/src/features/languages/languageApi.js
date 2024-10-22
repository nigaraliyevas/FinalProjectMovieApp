// src/features/genres/genresApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const serverDomain = import.meta.env.VITE_server_domain;
export const languageApi = createApi({
  reducerPath: "languageApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverDomain}/api/` }),
  endpoints: builder => ({
    getLanguages: builder.query({
      query: () => "OriginalLanguage",
    }),
    getLanguageById: builder.query({
      query: id => `OriginalLanguage/${id}`,
    }),
    createLanguage: builder.mutation({
      query: newGenre => ({
        url: "OriginalLanguage",
        method: "POST",
        body: newGenre,
      }),
    }),
    updateLanguage: builder.mutation({
      query: ({ id, ...updatedGenre }) => ({
        url: `OriginalLanguage/${id}`,
        method: "PUT",
        body: updatedGenre,
      }),
    }),
    deleteLanguage: builder.mutation({
      query: id => ({
        url: `OriginalLanLanguage/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetLanguagesQuery, useGetLanguageByIdQuery, useCreateLanguageMutation, useUpdateLanguageMutation, useDeleteLanguageMutation } = languageApi;
