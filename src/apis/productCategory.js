import { mainApi } from "./mainApi";
export const categoryApi = mainApi.injectEndpoints({
   tagTypes: ["Category", "SingleCategory", "Toppings"],
   endpoints: (builder) => ({
      getCategory: builder.query({
         query: (params) => ({
            url: `/admin/product-category`,
            params,
         }),
         providesTags: ["Category"],
      }),
      getGroupItems: builder.query({
         query: (params) => ({
            url: `/admin/categories/groups`,
            params,
         }),
         providesTags: ["Category"],
      }),
      getSingleCategory: builder.query({
         query: (data) => `/admin/product-category/${data?.id}`,
         providesTags: ["SingleCategory"],
      }),
      postCategory: builder.mutation({
         query: (data) => ({
            url: `/admin/product-category`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Category"],
      }),
      updateCategory: builder.mutation({
         query: ({ data, id }) => ({
            url: `/admin/product-category/${id}`,
            method: "POST",
            body: data,
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(categoryApi.util.invalidateTags(["Category"]));
         },
      }),
      deleteCategory: builder.mutation({
         query: (id) => ({
            url: `/admin/product-category/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(categoryApi.util.invalidateTags(["Category"]));
         },
      }),

      // topping items
      getToppingItems: builder.query({
         query: (params) => ({
            url: `/admin/topping-items`,
            params,
         }),
         providesTags: ["Toppings"],
      }),

      postToppingItems: builder.mutation({
         query: (data) => ({
            url: `/admin/topping-items`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Toppings"],
      }),
      // updateToppingItems: builder.mutation({
      //    query: ({ data, id }) => ({
      //       url: `/admin/topping-items/${id}`,
      //       method: "POST",
      //       body: data,
      //    }),
      //    async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //       await queryFulfilled;
      //       dispatch(categoryApi.util.invalidateTags(["Toppings"]));
      //    },
      // }),
      updateToppingItems: builder.mutation({
         query: ({ data, id }) => ({
            url: `/admin/topping-items/${id}`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Toppings"],
      }),
      deleteToppingItems: builder.mutation({
         query: (id) => ({
            url: `/admin/topping-items/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(categoryApi.util.invalidateTags(["Toppings"]));
         },
      }),
      postTransferMenuItems: builder.mutation({
         query: (data) => ({
            url: `/admin/transfer-menu-items`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Category"],
      }),
   }),
});

export const {
   useGetCategoryQuery,
   useGetGroupItemsQuery,
   useGetSingleCategoryQuery,
   usePostCategoryMutation,
   useUpdateCategoryMutation,
   useDeleteCategoryMutation,
   useGetToppingItemsQuery,
   usePostToppingItemsMutation,
   useUpdateToppingItemsMutation,
   useDeleteToppingItemsMutation,
   usePostTransferMenuItemsMutation,
} = categoryApi;
