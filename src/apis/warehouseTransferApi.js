import { mainApi } from "./mainApi";
export const warehouseTransferApi = mainApi.injectEndpoints({
  tagTypes: ["WarehouseTransfer"],
  endpoints: (builder) => ({
    getWarehouseTransfers: builder.query({
      query: (params) => ({
        url: `api/warehouse-transfer`,
        params,
      }),
      providesTags: ["WarehouseTransfer"],
    }),
    getSingleWarehouseTransfer: builder.query({
      query: (data) => `/api/warehouse-transfer/${data?.id}`,
    }),
    postWarehouseTransfer: builder.mutation({
      query: (data) => ({
        url: `/api/warehouse-transfer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["WarehouseTransfer"]),
    }),
    changeWarehouseTransferStatus: builder.mutation({
      query: (data) => ({
        url: `/api/warehouse-transfer/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          warehouseTransferApi.util.invalidateTags(["WarehouseTransfer"])
        );
      },
    }),
    updateWarehouseTransfer: builder.mutation({
      query: (data) => ({
        url: `/api/warehouse-transfer/${data?.id}`,
        method: "POST",
        body: data?.data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          warehouseTransferApi.util.invalidateTags(["WarehouseTransfer"])
        );
      },
    }),
    deleteWarehouseTransfer: builder.mutation({
      query: (data) => ({
        url: `/api/warehouse-transfer/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          warehouseTransferApi.util.invalidateTags(["WarehouseTransfer"])
        );
      },
    }),
  }),
});

export const {
  useGetWarehouseTransfersQuery,
  useGetSingleWarehouseTransferQuery,
  usePostWarehouseTransferMutation,
  useUpdateWarehouseTransferMutation,
  useDeleteWarehouseTransferMutation,
  useChangeWarehouseTransferStatusMutation,
} = warehouseTransferApi;
