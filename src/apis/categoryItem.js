import { mainApi } from "./mainApi";
export const categoryItemApi = mainApi.injectEndpoints({
   tagTypes: ["CategoryItem", "SingleCategoryItem"],
   endpoints: (builder) => ({
      getCategoryItem: builder.query({
         query: (params) => ({
            url: `/admin/products`,
            params,
         }),
         providesTags: ["CategoryItem"],
      }),
      getCategoryItemPos: builder.query({
         query: (params) => ({
            url: `/admin/pos/products`,
            params,
         }),
         providesTags: ["CategoryItem"],
      }),
      getProductVariationSearch: builder.query({
         query: (params) => ({
            url: `/admin/product-variations/search/product_variation`,
            params,
         }),
         providesTags: ["CategoryItem"],
      }),
      getSingleCategoryItem: builder.query({
         query: (data) => `/admin/products/${data?.id}`,
         providesTags: ["SingleCategoryItem"],
      }),
      postCategoryItem: builder.mutation({
         query: (data) => ({
            url: `/admin/products`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["CategoryItem"],
      }),
      updateFavouriteItem: builder.mutation({
         query: (data) => ({
            url: `/admin/favourite-menu-items`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["CategoryItem"],
      }),
      updateMenuItemStatus: builder.mutation({
         query: (data) => ({
            url: `/admin/product/update-show-menu-status`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["CategoryItem"],
      }),
      getFavouriteItem: builder.query({
         query: (params) => ({
            url: `/admin/favourite-menu-items`,
            params,
         }),
         providesTags: ["CategoryItem"],
      }),
      updateCategoryItem: builder.mutation({
         query: ({ data, id }) => ({
            url: `/admin/products/${id}`,
            method: "POST",
            body: data,
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(
               categoryItemApi.util.invalidateTags(["CategoryItem"])
            );
         },
      }),
      deleteCategoryItem: builder.mutation({
         query: (id) => ({
            url: `/admin/products/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(
               categoryItemApi.util.invalidateTags(["CategoryItem"])
            );
         },
      }),
      getMenuItemVarients: builder.query({
         query: (params) => ({
            url: `/admin/product-variations`,
            params,
         }),
         providesTags: ["CategoryItem"],
      }),
   }),
});

export const {
   useGetCategoryItemQuery,
   useGetCategoryItemPosQuery,
   useGetMenuItemVarientsQuery,
   useGetProductVariationSearchQuery,
   useGetSingleCategoryItemQuery,
   usePostCategoryItemMutation,
   useUpdateFavouriteItemMutation,
   useUpdateMenuItemStatusMutation,
   useGetFavouriteItemQuery,
   useUpdateCategoryItemMutation,
   useDeleteCategoryItemMutation,
} = categoryItemApi;
