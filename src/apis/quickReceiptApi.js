import { mainApi } from "./mainApi";
export const quickReceiptApi = mainApi.injectEndpoints({
  tagTypes: ["Receipt", "SingleReceipt"],
  endpoints: (builder) => ({
    getQuickReceipt: builder.query({
      query: (params) => ({ url: `/api/quick-receipt`, params }),
      providesTags: ["Receipt"],
    }),
    getSingleQuickReceipt: builder.query({
      query: (data) => `/api/quick-receipt/${data?.id}`,
      providesTags: ["SingleReceipt"],
    }),
    postQuickReceipt: builder.mutation({
      query: (data) => ({
        url: `/api/quick-receipt`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Receipt"]),
    }),
    updateQuickReceipt: builder.mutation({
      query: (data) => ({
        url: `/api/quick-receipt/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Receipt", "SingleReceipt"],
    }),
    deleteQuickReceipt: builder.mutation({
      query: (data) => ({
        url: `/api/quick-receipt/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Receipt"]),
    }),
    changeQuickReceiptStatus: builder.mutation({
      query: (data) => ({
        url: `/api/quick-receipt/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          quickReceiptApi.util.invalidateTags(["Receipt", "SingleReceipt"])
        );
      },
    }),
  }),
});

export const {
  useGetQuickReceiptQuery,
  useGetSingleQuickReceiptQuery,
  usePostQuickReceiptMutation,
  useUpdateQuickReceiptMutation,
  useDeleteQuickReceiptMutation,
  useChangeQuickReceiptStatusMutation,
} = quickReceiptApi;
