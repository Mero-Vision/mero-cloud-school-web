import { mainApi } from "./mainApi";
export const purchaseBillApi = mainApi.injectEndpoints({
  tagTypes: ["PurchaseBill", "SinglePurchaseBill"],
  endpoints: (builder) => ({
    getPurchaseBill: builder.query({
      query: (params) => ({ url: `/api/purchase-bill`, params }),
      providesTags: ["PurchaseBill"],
    }),
    getSinglePurchaseBill: builder.query({
      query: (data) => `/api/purchase-bill/${data?.id}`,
      providesTags: ["SinglePurchaseBill"],
      keepUnusedDataFor: 1,
    }),
    postPurchaseBill: builder.mutation({
      query: (data) => ({
        url: `/api/purchase-bill`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["PurchaseBill"]),
    }),
    updatePurchaseBill: builder.mutation({
      query: (data) => ({
        url: `/api/purchase-bill/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["PurchaseBill", "SinglePurchaseBill"],
    }),
    deletePurchaseBill: builder.mutation({
      query: (data) => ({
        url: `/api/purchase-bill/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(purchaseBillApi.util.invalidateTags(["PurchaseBill"]));
      },
    }),
    changePurchaseBillStatus: builder.mutation({
      query: (data) => ({
        url: `/api/purchase-bill/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          purchaseBillApi.util.invalidateTags([
            "PurchaseBill",
            "SinglePurchaseBill",
          ])
        );
      },
    }),
  }),
});

export const {
  useGetPurchaseBillQuery,
  useGetSinglePurchaseBillQuery,
  usePostPurchaseBillMutation,
  useUpdatePurchaseBillMutation,
  useDeletePurchaseBillMutation,
  useChangePurchaseBillStatusMutation,
} = purchaseBillApi;
