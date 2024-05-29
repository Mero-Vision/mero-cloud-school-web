import { mainApi } from "./mainApi";

const baseUrl = `/api/purchase-return`;
export const purchaseReturnApi = mainApi.injectEndpoints({
  tagTypes: ["PurchaseReturn", "SinglePurchaseReturn"],
  endpoints: (builder) => ({
    getPurchaseReturn: builder.query({
      query: (params) => ({ url: `${baseUrl}`, params }),
      providesTags: ["PurchaseReturn"],
    }),
    getSinglePurchaseReturn: builder.query({
      query: (data) => `${baseUrl}/${data?.id}`,
      providesTags: ["SinglePurchaseReturn"],
    }),
    postPurchaseReturn: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["PurchaseReturn"]),
    }),
    updatePurchaseReturn: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["PurchaseReturn", "SinglePurchaseReturn"],
    }),
    deletePurchaseReturn: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(purchaseReturnApi.util.invalidateTags(["PurchaseReturn"]));
      },
    }),
    changePurchaseReturnStatus: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          purchaseReturnApi.util.invalidateTags([
            "PurchaseReturn",
            "SinglePurchaseReturn",
          ])
        );
      },
    }),
  }),
});

export const {
  useGetPurchaseReturnQuery,
  useGetSinglePurchaseReturnQuery,
  usePostPurchaseReturnMutation,
  useUpdatePurchaseReturnMutation,
  useDeletePurchaseReturnMutation,
  useChangePurchaseReturnStatusMutation,
} = purchaseReturnApi;
