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

    // Filter movies by genre
    getMoviesByGenre: builder.query({
      query: ({ name, pageSize, page }) => `genre?name=${name}&pageSize=${pageSize}&page=${page}`,
      providesTags: (result, error, name) => [{ type: "GenreMovies", name }],
    }),

    // Filter movies by year
    filterByYear: builder.query({
      query: ({ year, pageSize, page }) => `year?year=${year}&pageSize=${pageSize}&page=${page}`,
      providesTags: (result, error, year) => [{ type: "YearMovies", year }],
    }),

    // Custom filter
    customFilter: builder.query({
      query: ({ year, genre, language, page, pageSize }) => `filter?year=${year}&genre=${genre}&language=${language}&page=${page}&pageSize=${pageSize}`,
      providesTags: (result, error, filters) => [{ type: "CustomFilteredMovies", filters }],
    }),

    // Mutation to delete a movie by ID
    deleteMovie: builder.mutation({
      query: id => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Movie", id }],
    }),

    // Mutation to update a movie
    updateMovie: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "POST", // Use PUT or PATCH for updates
        body: formData, // formData includes all fields, including files
      }),
      invalidatesTags: (result, error, id) => [{ type: "Movie", id }],
    }),

    // Mutation to create a movie
    createMovie: builder.mutation({
      query: formData => ({
        url: "/",
        method: "POST",
        body: formData, // formData includes all fields, including files
      }),
      invalidatesTags: [{ type: "Movies" }], // Invalidate the movie list to refresh the data
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useListMoviesQuery,
  useSearchMoviesQuery,
  useGetMoviesByGenreQuery,
  useFilterByYearQuery,
  useCustomFilterQuery,
  useGetMovieByIdQuery,
  useFreeMoviesQuery,
  useDeleteMovieMutation, // Added delete mutation
  useUpdateMovieMutation, // Added update mutation
  useCreateMovieMutation, // Added create mutation
} = movieApi;
