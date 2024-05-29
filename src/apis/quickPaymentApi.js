import { mainApi } from "./mainApi";
export const quickPaymentApi = mainApi.injectEndpoints({
  tagTypes: ["Payment", "SinglePayment"],
  endpoints: (builder) => ({
    getQuickPayment: builder.query({
      query: (params) => ({ url: `/api/quick-payment`, params }),
      providesTags: ["Payment"],
    }),
    getSingleQuickPayment: builder.query({
      query: (data) => `/api/quick-payment/${data?.id}`,
      providesTags: ["SinglePayment"],
    }),
    postQuickPayment: builder.mutation({
      query: (data) => ({
        url: `/api/quick-payment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Payment"]),
    }),
    updateQuickPayment: builder.mutation({
      query: (data) => ({
        url: `/api/quick-payment/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Payment", "SinglePayment"],
    }),
    deleteQuickPayment: builder.mutation({
      query: (data) => ({
        url: `/api/quick-payment/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Payment"]),
    }),
    changeQuickPaymentStatus: builder.mutation({
      query: (data) => ({
        url: `/api/quick-payment/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          quickPaymentApi.util.invalidateTags(["Payment", "SinglePayment"])
        );
      },
    }),
  }),
});

export const {
  useGetQuickPaymentQuery,
  useGetSingleQuickPaymentQuery,
  usePostQuickPaymentMutation,
  useUpdateQuickPaymentMutation,
  useDeleteQuickPaymentMutation,
  useChangeQuickPaymentStatusMutation,
} = quickPaymentApi;
