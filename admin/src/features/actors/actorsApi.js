import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const serverDomain = import.meta.env.VITE_server_domain;

export const actorsApi = createApi({
  reducerPath: "actorsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverDomain}/api/` }),
  endpoints: builder => ({
    getActors: builder.query({
      query: () => "Actor",
    }),
    getActorById: builder.query({
      query: id => `Actor/${id}`,
    }),
    createActor: builder.mutation({
      query: newActor => ({
        url: "Actor",
        method: "POST",
        body: newActor,
      }),
    }),
    updateActor: builder.mutation({
      query: ({ id, ...updatedActor }) => ({
        url: `Actor/${id}`,
        method: "PUT",
        body: updatedActor,
      }),
    }),
    deleteActor: builder.mutation({
      query: id => ({
        url: `Actor/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetActorsQuery,
  useGetActorByIdQuery,
  useCreateActorMutation,
  useUpdateActorMutation,
  useDeleteActorMutation
} = actorsApi;
