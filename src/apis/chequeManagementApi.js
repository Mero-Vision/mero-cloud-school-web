import { mainApi } from "./mainApi";
import { paymentChequeApi } from "./paymentChequeApi";

const chequeList = `/api/bank-cheque`;
export const chequeManagementApi = mainApi.injectEndpoints({
  tagTypes: ["ChequeList", "SingleChequeList"],
  endpoints: (builder) => ({
    getChequeList: builder.query({
      query: (params) => ({ url: `${chequeList}`, params }),
      providesTags: ["ChequeList"],
    }),
    getSingleChequeList: builder.query({
      query: (data) => `${chequeList}/${data?.id}`,
      providesTags: ["SingleChequeList"],
    }),
    postChequeList: builder.mutation({
      query: (data) => ({
        url: `${chequeList}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["ChequeList"]),
    }),
    updateChequeList: builder.mutation({
      query: (data) => ({
        url: `${chequeList}/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["ChequeList", "SingleChequeList"],
    }),
    deleteChequeList: builder.mutation({
      query: (data) => ({
        url: `${chequeList}/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["ChequeList"]),
    }),
    changeChequeListStatus: builder.mutation({
      query: (data) => ({
        url: `/api/cheque/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["ChequeList", "SingleChequeList"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(paymentChequeApi.util.invalidateTags(["PaymentCheque"]));
      },
    }),
  }),
});

export const {
  useGetChequeListQuery,
  useGetSingleChequeListQuery,
  usePostChequeListMutation,
  useUpdateChequeListMutation,
  useDeleteChequeListMutation,
  useChangeChequeListStatusMutation,
} = chequeManagementApi;
