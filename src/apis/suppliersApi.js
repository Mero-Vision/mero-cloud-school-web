import { mainApi } from "./mainApi";
export const suppliersApi = mainApi.injectEndpoints({
  tagTypes: ["Suppliers", "SingleSupplier"],
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: (params) => ({ url: `/api/vendor`, params }),
      providesTags: ["Suppliers"],
    }),
    getSingleSupplier: builder.query({
      query: (data) => `/api/vendor/${data?.id}`,
      providesTags: ["SingleSupplier"],
    }),
    postSupplier: builder.mutation({
      query: (data) => ({
        url: `/api/vendor`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Suppliers"]),
    }),
    updateSupplier: builder.mutation({
      query: (data) => ({
        url: `/api/vendor/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Suppliers", "SingleSupplier"],
    }),
    deleteSupplier: builder.mutation({
      query: (data) => ({
        url: `/api/vendor/${data?.id}`,
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          await queryFulfilled;
          dispatch(suppliersApi.util.invalidateTags(["Suppliers"]));
        },
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Suppliers"]),
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useGetSingleSupplierQuery,
  usePostSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = suppliersApi;
