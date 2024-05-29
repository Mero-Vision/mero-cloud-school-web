import { mainApi } from "./mainApi";

const baseUrl = `/api/purchase-order`;
export const purchaseOrderApi = mainApi.injectEndpoints({
  tagTypes: ["PurchaseOrder", "SinglePurchaseOrder"],
  endpoints: (builder) => ({
    getPurchaseOrder: builder.query({
      query: (params) => ({ url: `${baseUrl}`, params }),
      providesTags: ["PurchaseOrder"],
    }),
    getSinglePurchaseOrder: builder.query({
      query: (data) => `${baseUrl}/${data?.id}`,
      providesTags: ["SinglePurchaseOrder"],
    }),
    postPurchaseOrder: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["PurchaseOrder"]),
    }),
    updatePurchaseOrder: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["PurchaseOrder", "SinglePurchaseOrder"],
    }),
    deletePurchaseOrder: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(purchaseOrderApi.util.invalidateTags(["PurchaseOrder"]));
      },
    }),
    changePurchaseOrderStatus: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          purchaseOrderApi.util.invalidateTags([
            "PurchaseOrder",
            "SinglePurchaseOrder",
          ])
        );
      },
    }),
  }),
});

export const {
  useGetPurchaseOrderQuery,
  useGetSinglePurchaseOrderQuery,
  usePostPurchaseOrderMutation,
  useUpdatePurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
  useChangePurchaseOrderStatusMutation,
} = purchaseOrderApi;
