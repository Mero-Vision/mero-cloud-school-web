import { mainApi } from "./mainApi";
export const productsApi = mainApi.injectEndpoints({
   tagTypes: ["Products"],
   endpoints: (builder) => ({
      getProducts: builder.query({
         query: (params) => ({
            url: `/admin/inventory-products`,
            params,
         }),
         providesTags: ["Products"],
      }),
      getSingleProduct: builder.query({
         query: (data) => `/admin/inventory-products/${data?.id}`,
         providesTags: ["Products"],
      }),
      getSingleInventoryAdjustmentHistory: builder.query({
         query: (data) =>
            `/admin/inventory-products/show-inventory-adjustment-details/${data?.id}`,
         providesTags: ["Products"],
      }),
      postProduct: builder.mutation({
         query: (data) => ({
            url: `/admin/inventory-products`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Products"],
      }),
      updateProduct: builder.mutation({
         query: (data) => ({
            url: `/admin/inventory-products/${data?.id}`,
            method: "POST",
            body: { ...data, _method: "PUT" },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(productsApi.util.invalidateTags(["Products"]));
         },
      }),
      deleteProduct: builder.mutation({
         query: (data) => ({
            url: `/admin/inventory-products/${data?.id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(productsApi.util.invalidateTags(["Products"]));
         },
      }),
      postMultipleMenuItems: builder.mutation({
         query: (data) => ({
            url: `/admin/store-multiple-products`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Products"],
      }),
   }),
});

export const {
   useGetProductsQuery,
   useGetSingleProductQuery,
   useGetSingleInventoryAdjustmentHistoryQuery,
   usePostProductMutation,
   usePostMultipleMenuItemsMutation,
   useUpdateProductMutation,
   useDeleteProductMutation,
} = productsApi;
