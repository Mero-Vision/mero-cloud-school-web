import { mainApi } from "./mainApi";
export const commentApi = mainApi.injectEndpoints({
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (params) => ({
        url: `api/comment`,
        params,
      }),
      providesTags: ["Comments"],
    }),
    getSingleComment: builder.query({
      query: (data) => `/api/comment/${data?.id}`,
    }),
    postComment: builder.mutation({
      query: (data) => ({
        url: `/api/comment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Comments"]),
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: `/api/comment/${data?.id}`,
        method: "POST",
        body: data?.data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(commentApi.util.invalidateTags(["Comments"]));
      },
    }),
    deleteComment: builder.mutation({
      query: (data) => ({
        url: `/api/comment/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(commentApi.util.invalidateTags(["Comments"]));
      },
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetSingleCommentQuery,
  usePostCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
