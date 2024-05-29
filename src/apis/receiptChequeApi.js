import { mainApi } from "./mainApi";

const baseUrl = `/api/receipt-cheque`;
export const receiptChequeApi = mainApi.injectEndpoints({
  tagTypes: ["ReceiptCheque", "SingleList"],
  endpoints: (builder) => ({
    getReceiptCheque: builder.query({
      query: (params) => ({ url: `${baseUrl}`, params }),
      providesTags: ["ReceiptCheque"],
    }),
    getSingleReceiptCheque: builder.query({
      query: (data) => `${baseUrl}/${data?.id}`,
      providesTags: ["SingleList"],
    }),
    postReceiptCheque: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["ReceiptCheque"]),
    }),
    updateReceiptCheque: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(receiptChequeApi.util.invalidateTags(["ReceiptCheque"]));
      },
    }),
    deleteReceiptCheque: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(receiptChequeApi.util.invalidateTags(["ReceiptCheque"]));
      },
    }),
    changeReceiptChequeStatus: builder.mutation({
      query: (data) => ({
        url: `/api/receipt-cheque/${data?.id}/update-cheque-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(receiptChequeApi.util.invalidateTags(["ReceiptCheque"]));
      },
    }),
  }),
});

export const {
  useGetReceiptChequeQuery,
  useGetSingleReceiptChequeQuery,
  usePostReceiptChequeMutation,
  useUpdateReceiptChequeMutation,
  useDeleteReceiptChequeMutation,
  useChangeReceiptChequeStatusMutation,
} = receiptChequeApi;
