import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const serverDomain = import.meta.env.VITE_server_domain;

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverDomain}/api/` }),
  endpoints: builder => ({
    getTags: builder.query({
      query: () => "Tag",
    }),
    getTagById: builder.query({
      query: id => `Tag/${id}`,
    }),
    createTag: builder.mutation({
      query: newTag => ({
        url: "Tag",
        method: "POST",
        body: newTag,
      }),
    }),
    updateTag: builder.mutation({
      query: ({ id, ...updatedTag }) => ({
        url: `Tag/${id}`,
        method: "PUT",
        body: updatedTag,
      }),
    }),
    deleteTag: builder.mutation({
      query: id => ({
        url: `Tag/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetTagByIdQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation
} = tagsApi;
