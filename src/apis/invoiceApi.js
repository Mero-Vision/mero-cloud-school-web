import { mainApi } from "./mainApi";
export const invoiceApi = mainApi.injectEndpoints({
  tagTypes: ["Invoice", "SingleInvoice"],
  endpoints: (builder) => ({
    getInvoice: builder.query({
      query: (params) => ({ url: `/api/invoice`, params }),
      providesTags: ["Invoice"],
    }),
    getSingleInvoice: builder.query({
      query: (data) => `/api/invoice/${data?.id}`,
      providesTags: ["SingleInvoice"],
      keepUnusedDataFor: 1,
    }),
    postInvoice: builder.mutation({
      query: (data) => ({
        url: `/api/invoice`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Invoice"]),
    }),
    updateInvoice: builder.mutation({
      query: (data) => ({
        url: `/api/invoice/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Invoice", "SingleInvoice"],
    }),
    deleteInvoice: builder.mutation({
      query: (data) => ({
        url: `/api/invoice/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(invoiceApi.util.invalidateTags(["Invoice"]));
      },
    }),
    changeInvoiceStatus: builder.mutation({
      query: (data) => ({
        url: `/api/invoice/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(invoiceApi.util.invalidateTags(["Invoice", "SingleInvoice"]));
      },
    }),
  }),
});

export const {
  useGetInvoiceQuery,
  useGetSingleInvoiceQuery,
  usePostInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
  useChangeInvoiceStatusMutation,
} = invoiceApi;
