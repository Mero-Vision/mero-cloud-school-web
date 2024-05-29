import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = mainApi.injectEndpoints({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://jsonplaceholder.typicode.com`,
  }),

  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      providesTags: ["Todos"],
    }),
    getSingleTodos: builder.query({
      query: (data) => `/todos/${data?.id}`,
    }),
    postTodos: builder.mutation({
      query: (data) => ({
        url: `/todos`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Todos"]),
    }),
    updateTodos: builder.mutation({
      query: (data) => ({
        url: `/todos/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Todos"]),
    }),
    deleteTodos: builder.mutation({
      query: (data) => ({
        url: `/todos/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Todos"]),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetSingleTodosQuery,
  usePostTodosMutation,
  useUpdateTodosMutation,
  useDeleteTodosMutation,
} = todosApi;
