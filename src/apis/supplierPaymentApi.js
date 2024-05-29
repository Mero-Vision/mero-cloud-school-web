import { mainApi } from "./mainApi";
import { purchaseBillApi } from "./purchaseBillApi";

export const supplierPaymentApi = mainApi.injectEndpoints({
  tagTypes: ["Payment", "SinglePayment"],
  endpoints: (builder) => ({
    getSupplierPayment: builder.query({
      query: (params) => ({ url: `/api/purchase-payment`, params }),
      providesTags: ["Payment"],
    }),
    getSingleSupplierPayment: builder.query({
      query: (data) => `/api/purchase-payment/${data?.id}`,
      providesTags: ["SinglePayment"],
    }),
    postSupplierPayment: builder.mutation({
      query: (data) => ({
        url: `/api/purchase-payment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Payment"]),
    }),
    updateSupplierPayment: builder.mutation({
      query: (data) => ({
        url: `/api/purchase-payment/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Payment", "SinglePayment"],
    }),
    deleteSupplierPayment: builder.mutation({
      query: (data) => ({
        url: `/api/purchase-payment/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(supplierPaymentApi.util.invalidateTags(["Payment"]));
      },
    }),
    changeSupplierPaymentStatus: builder.mutation({
      query: (data) => ({
        url: `/api/purchase-payment/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          supplierPaymentApi.util.invalidateTags(["Payment", "SinglePayment"])
        );
        dispatch(purchaseBillApi.util.invalidateTags(["SinglePurchaseBill"]));
      },
    }),
  }),
});

export const {
  useGetSupplierPaymentQuery,
  useGetSingleSupplierPaymentQuery,
  usePostSupplierPaymentMutation,
  useUpdateSupplierPaymentMutation,
  useDeleteSupplierPaymentMutation,
  useChangeSupplierPaymentStatusMutation,
} = supplierPaymentApi;
