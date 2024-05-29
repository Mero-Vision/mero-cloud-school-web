import { mainApi } from "./mainApi";

const baseUrl = `/api/quotation`;
export const quotationApi = mainApi.injectEndpoints({
  tagTypes: ["Quotation", "SingleQuotation"],
  endpoints: (builder) => ({
    getQuotation: builder.query({
      query: (params) => ({ url: `${baseUrl}`, params }),
      providesTags: ["Quotation"],
    }),
    getSingleQuotation: builder.query({
      query: (data) => `${baseUrl}/${data?.id}`,
      providesTags: ["SingleQuotation"],
    }),
    postQuotation: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Quotation"]),
    }),
    updateQuotation: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Quotation", "SingleQuotation"],
    }),
    deleteQuotation: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(quotationApi.util.invalidateTags(["Quotation"]));
      },
    }),
    changeQuotationStatus: builder.mutation({
      query: (data) => ({
        url: `${baseUrl}/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          quotationApi.util.invalidateTags(["Quotation", "SingleQuotation"])
        );
      },
    }),
  }),
});

export const {
  useGetQuotationQuery,
  useGetSingleQuotationQuery,
  usePostQuotationMutation,
  useUpdateQuotationMutation,
  useDeleteQuotationMutation,
  useChangeQuotationStatusMutation,
} = quotationApi;
