// src/features/genres/genresApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const serverDomain = import.meta.env.VITE_server_domain;
export const genresApi = createApi({
  reducerPath: "genresApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverDomain}/api/` }),
  endpoints: builder => ({
    getGenres: builder.query({
      query: () => "Genre",
    }),
    getGenreById: builder.query({
      query: id => `Genre/${id}`,
    }),
    createGenre: builder.mutation({
      query: newGenre => ({
        url: "Genre",
        method: "POST",
        body: newGenre,
      }),
    }),
    updateGenre: builder.mutation({
      query: ({ id, ...updatedGenre }) => ({
        url: `Genre/${id}`,
        method: "PUT",
        body: updatedGenre,
      }),
    }),
    deleteGenre: builder.mutation({
      query: id => ({
        url: `Genre/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetGenresQuery, useGetGenreByIdQuery, useCreateGenreMutation, useUpdateGenreMutation, useDeleteGenreMutation } = genresApi;
