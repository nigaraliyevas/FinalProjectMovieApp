import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serverDomain = import.meta.env.VITE_server_domain;

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverDomain}/api/Movie` }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token; // Retrieve token from state
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  endpoints: builder => ({
    // Get all movies with pagination
    listMovies: builder.query({
      query: ({ page, pageSize }) => `?page=${page}&pageSize=${pageSize}`,
      providesTags: (result, error, page) => [{ page }],
    }),
    freeMovies: builder.query({
      query: ({ page, pageSize }) => `free?&pageSize=${pageSize}&page=${page}`,
      providesTags: (result, error, page) => [{ page }],
    }),

    // Get movie by ID
    getMovieById: builder.query({
      query: id => `/${id}`,
      transformResponse: response => response,
    }),

    // Search movies by name (updated URL)
    searchMovies: builder.query({
      query: ({ name, pageSize, page }) => `name?name=${name}&pageSize=${pageSize}&page=${page}`,
      providesTags: (result, error, name) => [{ type: "SearchMovies", name }],
    }),

    // Filter movies by genre (no change needed for now, assuming you keep the same logic)
    getMoviesByGenre: builder.query({
      // query: genre => `GetAllByGenre?genre=${genre}`,
      query: ({ name, pageSize, page }) => `genre?name=${name}&pageSize=${pageSize}&page=${page}`,

      providesTags: (result, error, name) => [{ type: "GenreMovies", name }],
    }),

    // Filter movies by year (updated URL)
    filterByYear: builder.query({
      query: ({ year, pageSize, page }) => `year?year=${year}&pageSize=${pageSize}&page=${page}`,
      providesTags: (result, error, year) => [{ type: "YearMovies", year }],
    }),

    // Custom filter (updated URL)
    customFilter: builder.query({
      query: ({ year, genre, language, page, pageSize }) => `filter?year=${year}&genre=${genre}&language=${language}&page=${page}&pageSize=${pageSize}`,
      providesTags: (result, error, filters) => [{ type: "CustomFilteredMovies", filters }],
    }),
  }),
});

export const { useListMoviesQuery, useSearchMoviesQuery, useGetMoviesByGenreQuery, useFilterByYearQuery, useCustomFilterQuery, useGetMovieByIdQuery, useFreeMoviesQuery } = movieApi;
