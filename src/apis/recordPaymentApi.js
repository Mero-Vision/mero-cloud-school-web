import { invoiceApi } from "./invoiceApi";
import { mainApi } from "./mainApi";

export const recordPaymentApi = mainApi.injectEndpoints({
  tagTypes: ["Payment", "SinglePayment"],
  endpoints: (builder) => ({
    getRecordPayment: builder.query({
      query: (params) => ({ url: `/api/sales-payment`, params }),
      providesTags: ["Payment"],
    }),
    getSingleRecordPayment: builder.query({
      query: (data) => `/api/sales-payment/${data?.id}`,
      providesTags: ["SinglePayment"],
    }),
    postRecordPayment: builder.mutation({
      query: (data) => ({
        url: `/api/sales-payment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Payment"]),
    }),
    updateRecordPayment: builder.mutation({
      query: (data) => ({
        url: `/api/sales-payment/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Payment", "SinglePayment"],
    }),
    deleteRecordPayment: builder.mutation({
      query: (data) => ({
        url: `/api/sales-payment/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(recordPaymentApi.util.invalidateTags(["Payment"]));
      },
    }),
    changeRecordPaymentStatus: builder.mutation({
      query: (data) => ({
        url: `/api/sales-payment/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          recordPaymentApi.util.invalidateTags(["Payment", "SinglePayment"])
        );
        dispatch(invoiceApi.util.invalidateTags(["SingleInvoice"]));
      },
    }),
  }),
});

export const {
  useGetRecordPaymentQuery,
  useGetSingleRecordPaymentQuery,
  usePostRecordPaymentMutation,
  useUpdateRecordPaymentMutation,
  useDeleteRecordPaymentMutation,
  useChangeRecordPaymentStatusMutation,
} = recordPaymentApi;
