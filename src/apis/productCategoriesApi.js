import { mainApi } from "./mainApi";
export const productCategoriesApi = mainApi.injectEndpoints({
  tagTypes: ["ProductCategories"],
  endpoints: (builder) => ({
    getProductCategory: builder.query({
      query: (params) => ({ url: `/api/product-category`, params }),
      providesTags: ["ProductCategories"],
    }),
    getSingleProductCategory: builder.query({
      query: (data) => `/api/product-category/${data?.id}`,
    }),
    postProductCategory: builder.mutation({
      query: (data) => ({
        url: `/api/product-category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["ProductCategories"]),
    }),
    updateProductCategory: builder.mutation({
      query: (data) => ({
        url: `/api/product-category/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          productCategoriesApi.util.invalidateTags(["ProductCategories"])
        );
      },
    }),
    deleteProductCategory: builder.mutation({
      query: (data) => ({
        url: `/api/product-category/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          productCategoriesApi.util.invalidateTags(["ProductCategories"])
        );
      },
    }),
  }),
});

export const {
  useGetProductCategoryQuery,
  useGetSingleProductCategoryQuery,
  usePostProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useDeleteProductCategoryMutation,
} = productCategoriesApi;
