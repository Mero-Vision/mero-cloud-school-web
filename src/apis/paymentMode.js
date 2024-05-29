import { mainApi } from "./mainApi";
export const paymentModeApi = mainApi.injectEndpoints({
   tagTypes: ["PaymentMode"],
   endpoints: (builder) => ({
      getPaymentMode: builder.query({
         query: (params) => ({
            url: `/admin/payment-option`,
            params,
         }),
         providesTags: ["PaymentMode"],
      }),
      getPaymentModeAdmin: builder.query({
         query: (data) => ({
            url: `/admin/company/${data?.id}/payment-option`,
         }),
         providesTags: ["PaymentMode"],
      }),
      getSinglePaymentMode: builder.query({
         query: (data) => `/admin/customers/${data?.id}`,
         providesTags: ["SingleCustomer"],
      }),
      postPaymentMode: builder.mutation({
         query: (data) => ({
            url: `/admin/company/${data?.companyId}/payment-option`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["PaymentMode"],
      }),
      updatePaymentMode: builder.mutation({
         query: ({ data, id }) => ({
            url: `/admin/company/${id}/payment-option/update`,
            method: "POST",
            body: data,
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(
               paymentModeApi.util.invalidateTags(["PaymentMode"])
            );
         },
      }),
      deletePaymentMode: builder.mutation({
         query: (id) => ({
            url: `/admin/payment-options/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(
               paymentModeApi.util.invalidateTags(["PaymentMode"])
            );
         },
      }),
      updatePaymentOptionsStatus: builder.mutation({
         query: (data) => ({
            url: `/admin/company/${data?.id}/payment-option/update-status`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["PaymentMode"],
      }),
   }),
});

export const {
   useGetPaymentModeQuery,
   useGetPaymentModeAdminQuery,
   useGetSinglePaymentModeQuery,
   usePostPaymentModeMutation,
   useUpdatePaymentModeMutation,
   useDeletePaymentModeMutation,
   useUpdatePaymentOptionsStatusMutation,
} = paymentModeApi;
