export const getTokenFromLocalOrSessionStorage = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const serverDomain = import.meta.env.VITE_server_domain;
export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverDomain}/api/` }),
  // prepareHeaders: headers => {
  //   const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  //   if (token) {
  //     headers.set("Authorization", `Bearer ${token}`);
  //   }
  //   return headers;
  // },
  endpoints: builder => ({
    getComments: builder.query({
      query: () => "Comment",
    }),
    getCommentById: builder.query({
      query: id => `Comment/${id}`,
    }),
    createComment: builder.mutation({
      query: body => ({
        url: "Comment",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalOrSessionStorage()}`,
        },
        body,
      }),
    }),
    updateComment: builder.mutation({
      query: ({ id, ...updatedGenre }) => ({
        url: `Comment/${id}`,
        method: "PUT",
        body: updatedGenre,
      }),
    }),
    deleteComment: builder.mutation({
      query: id => ({
        url: `Comment/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetCommentsQuery, useGetCommentByIdQuery, useCreateCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } = commentApi;
