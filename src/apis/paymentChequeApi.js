import { mainApi } from "./mainApi";

const baseUrl = `/api/payment-cheque`;
export const paymentChequeApi = mainApi.injectEndpoints({
  tagTypes: ["PaymentCheque", "SinglePaymentChequeList"],
  endpoints: (builder) => ({
    getPaymentCheque: builder.query({
      query: (params) => ({ url: `${baseUrl}`, params }),
      providesTags: ["PaymentCheque"],
    }),
    getSinglePaymentCheque: builder.query({
      query: (data) => `${baseUrl}/${data?.id}`,
      providesTags: ["SinglePaymentChequeList"],
    }),
    postPaymentCheque: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["PaymentCheque"]),
    }),
    updatePaymentCheque: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(paymentChequeApi.util.invalidateTags(["PaymentCheque"]));
      },
    }),
    deletePaymentCheque: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(paymentChequeApi.util.invalidateTags(["PaymentCheque"]));
      },
    }),
    changePaymentChequeStatus: builder.mutation({
      query: (data) => ({
        url: `/api/cheque/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(paymentChequeApi.util.invalidateTags(["PaymentCheque"]));
      },
    }),
  }),
});

export const {
  useGetPaymentChequeQuery,
  useGetSinglePaymentChequeQuery,
  usePostPaymentChequeMutation,
  useUpdatePaymentChequeMutation,
  useDeletePaymentChequeMutation,
  useChangePaymentChequeStatusMutation,
} = paymentChequeApi;
