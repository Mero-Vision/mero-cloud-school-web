import { mainApi } from "./mainApi";
export const qrPaymentApi = mainApi.injectEndpoints({
   tagTypes: ["QRPayment"],
   endpoints: (builder) => ({
      getQRPayment: builder.query({
         query: (params) => ({
            url: `/admin/qr-payment`,
            params,
         }),
         providesTags: ["QRPayment"],
      }),

      postQRPayment: builder.mutation({
         query: (data) => ({
            url: `/admin/qr-payment`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["QRPayment"],
      }),
      updateQRPayment: builder.mutation({
         query: ({ data, id }) => ({
            url: `/admin/qr-payment/${id}`,
            method: "POST",
            body: data,
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(qrPaymentApi.util.invalidateTags(["QRPayment"]));
         },
      }),
      deleteQRPayment: builder.mutation({
         query: (id) => ({
            url: `/admin/qr-payment/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(qrPaymentApi.util.invalidateTags(["QRPayment"]));
         },
      }),
   }),
});

export const {
   useGetQRPaymentQuery,
   usePostQRPaymentMutation,
   useUpdateQRPaymentMutation,
   useDeleteQRPaymentMutation,
} = qrPaymentApi;
