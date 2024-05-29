import { mainApi } from "./mainApi";

const baseUrl = `/api/sales-return`;
export const salesReturnApi = mainApi.injectEndpoints({
  tagTypes: ["SalesReturn", "SingleSalesReturn"],
  endpoints: (builder) => ({
    getSalesReturn: builder.query({
      query: (params) => ({ url: `${baseUrl}`, params }),
      providesTags: ["SalesReturn"],
    }),
    getSingleSalesReturn: builder.query({
      query: (data) => `${baseUrl}/${data?.id}`,
      providesTags: ["SingleSalesReturn"],
    }),
    postSalesReturn: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["SalesReturn"]),
    }),
    updateSalesReturn: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["SalesReturn", "SingleSalesReturn"],
    }),
    deleteSalesReturn: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(salesReturnApi.util.invalidateTags(["SalesReturn"]));
      },
    }),
    changeSalesReturnStatus: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          salesReturnApi.util.invalidateTags([
            "SalesReturn",
            "SingleSalesReturn",
          ])
        );
      },
    }),
  }),
});

export const {
  useGetSalesReturnQuery,
  useGetSingleSalesReturnQuery,
  usePostSalesReturnMutation,
  useUpdateSalesReturnMutation,
  useDeleteSalesReturnMutation,
  useChangeSalesReturnStatusMutation,
} = salesReturnApi;
