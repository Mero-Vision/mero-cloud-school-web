import { mainApi } from "./mainApi";
export const warehouseApi = mainApi.injectEndpoints({
  tagTypes: ["Warehouse", "SingleWarehouse"],
  endpoints: (builder) => ({
    getWarehouse: builder.query({
      query: (params) => ({ url: `/api/warehouse`, params }),
      providesTags: ["Warehouse"],
    }),
    getSingleWarehouse: builder.query({
      query: (data) => `/api/warehouse/${data?.id}`,
      providesTags: ["SingleWarehouse"],
      keepUnusedDataFor: 1,
    }),
    postWarehouse: builder.mutation({
      query: (data) => ({
        url: `/api/warehouse`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Warehouse"]),
    }),
    updateWarehouse: builder.mutation({
      query: (data) => ({
        url: `/api/warehouse/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(warehouseApi.util.invalidateTags(["Warehouse"]));
      },
    }),
    deleteWarehouse: builder.mutation({
      query: (data) => ({
        url: `/api/warehouse/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(warehouseApi.util.invalidateTags(["Warehouse"]));
      },
    }),
    changeWarehouseStatus: builder.mutation({
      query: (data) => ({
        url: `/api/warehouse/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(warehouseApi.util.invalidateTags(["Warehouse"]));
      },
    }),
  }),
});

export const {
  useGetWarehouseQuery,
  useGetSingleWarehouseQuery,
  usePostWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
  useChangeWarehouseStatusMutation,
} = warehouseApi;
