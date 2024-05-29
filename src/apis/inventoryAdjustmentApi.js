import { mainApi } from "./mainApi";
export const inventoryAdjustmentApi = mainApi.injectEndpoints({
   tagTypes: ["Adjustment", "SingleAdjustment"],
   endpoints: (builder) => ({
      getInventoryAdjustments: builder.query({
         query: (params) => ({
            url: `admin/inventory-adjustments`,
            params,
         }),
         providesTags: ["Adjustment"],
      }),
      getSingleInventoryAdjustment: builder.query({
         query: (data) => `/admin/inventory-adjustments/${data?.id}`,
         providesTags: ["Adjustment", "SingleAdjustment"],
      }),

      postInventoryAdjustment: builder.mutation({
         query: (data) => ({
            url: `/admin/inventory-adjustments`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Adjustment"],
      }),
      updateInventoryAdjustment: builder.mutation({
         query: (data) => ({
            url: `/admin/inventory-adjustments/${data?.id}`,
            method: "POST",
            body: data?.data,
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(
               inventoryAdjustmentApi.util.invalidateTags([
                  "Adjustment",
               ])
            );
         },
      }),
      deleteInventoryAdjustment: builder.mutation({
         query: (data) => ({
            url: `/admin/inventory-adjustments/${data?.id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(
               inventoryAdjustmentApi.util.invalidateTags([
                  "Adjustment",
               ])
            );
         },
      }),
   }),
});

export const {
   useGetInventoryAdjustmentsQuery,
   useGetSingleInventoryAdjustmentQuery,
   usePostInventoryAdjustmentMutation,
   useUpdateInventoryAdjustmentMutation,
   useDeleteInventoryAdjustmentMutation,
} = inventoryAdjustmentApi;
