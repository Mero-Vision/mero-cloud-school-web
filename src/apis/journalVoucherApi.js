import { mainApi } from "./mainApi";
export const journalVoucherApi = mainApi.injectEndpoints({
  tagTypes: ["Voucher", "SingleVoucher"],
  endpoints: (builder) => ({
    getJournalVoucher: builder.query({
      query: (params) => ({ url: `/api/journal-voucher`, params }),
      providesTags: [`Voucher`],
    }),
    getSingleJournalVoucher: builder.query({
      query: (data) => `/api/journal-voucher/${data?.id}`,
      providesTags: ["SingleVoucher"],
    }),
    postJournalVoucher: builder.mutation({
      query: (data) => ({
        url: `/api/journal-voucher`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Voucher"]),
    }),
    updateJournalVoucher: builder.mutation({
      query: (data) => ({
        url: `/api/journal-voucher/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(journalVoucherApi.util.invalidateTags(["Voucher"]));
      },
    }),
    deleteJournalVoucher: builder.mutation({
      query: (data) => ({
        url: `/api/journal-voucher/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(journalVoucherApi.util.invalidateTags(["Voucher"]));
      },
    }),
    changeJournalStatus: builder.mutation({
      query: (data) => ({
        url: `/api/journal-voucher/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          journalVoucherApi.util.invalidateTags(["Voucher", "SingleVoucher"])
        );
      },
    }),
  }),
});

export const {
  useGetJournalVoucherQuery,
  useGetSingleJournalVoucherQuery,
  usePostJournalVoucherMutation,
  useUpdateJournalVoucherMutation,
  useDeleteJournalVoucherMutation,
  useChangeJournalStatusMutation,
} = journalVoucherApi;
