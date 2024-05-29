import { mainApi } from "./mainApi";

const baseUrl = `/api/sales-order`;
export const salesOrderApi = mainApi.injectEndpoints({
  tagTypes: ["SalesOrder", "SingleSalesOrder"],
  endpoints: (builder) => ({
    getSalesOrder: builder.query({
      query: (params) => ({ url: `${baseUrl}`, params }),
      providesTags: ["SalesOrder"],
    }),
    getSingleSalesOrder: builder.query({
      query: (data) => `${baseUrl}/${data?.id}`,
      providesTags: ["SingleSalesOrder"],
    }),
    postSalesOrder: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["SalesOrder"]),
    }),
    updateSalesOrder: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["SalesOrder", "SingleSalesOrder"],
    }),
    deleteSalesOrder: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(salesOrderApi.util.invalidateTags(["SalesOrder"]));
      },
    }),
    changeSalesOrderStatus: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          salesOrderApi.util.invalidateTags(["SalesOrder", "SingleSalesOrder"])
        );
      },
    }),
  }),
});

export const {
  useGetSalesOrderQuery,
  useGetSingleSalesOrderQuery,
  usePostSalesOrderMutation,
  useUpdateSalesOrderMutation,
  useDeleteSalesOrderMutation,
  useChangeSalesOrderStatusMutation,
} = salesOrderApi;
