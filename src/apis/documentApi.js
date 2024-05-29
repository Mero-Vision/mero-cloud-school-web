import { mainApi } from "./mainApi";
export const documentApi = mainApi.injectEndpoints({
  tagTypes: ["Documents"],
  endpoints: (builder) => ({
    getDocuments: builder.query({
      query: (params) => ({
        url: `/api/document`,
        params,
      }),
      providesTags: ["Documents"],
    }),
    getSingleDocument: builder.query({
      query: (data) => `/api/document/${data?.id}`,
    }),
    postDocument: builder.mutation({
      query: (data) => ({
        url: `/api/document`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Documents"]),
    }),
    updateDocument: builder.mutation({
      query: (data) => ({
        url: `/api/document/${data?.id}`,
        method: "POST",
        body: data?.data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(documentApi.util.invalidateTags(["Documents"]));
      },
    }),
    deleteDocument: builder.mutation({
      query: (data) => ({
        url: `/api/document/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(documentApi.util.invalidateTags(["Documents"]));
      },
    }),
    changeDocumentStatus: builder.mutation({
      query: (data) => ({
        url: `/api/document/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(documentApi.util.invalidateTags(["Documents"]));
      },
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useGetSingleDocumentQuery,
  usePostDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
  useChangeDocumentStatusMutation,
} = documentApi;
