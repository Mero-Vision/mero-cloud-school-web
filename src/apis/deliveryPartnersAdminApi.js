import { mainApi } from "./mainApi";
export const deliveryPartnerAdminApi = mainApi.injectEndpoints({
   tagTypes: ["DeliveryPartnerAdmin"],
   endpoints: (builder) => ({
      getSingleDeliveryPartnerTableAdmin: builder.query({
         query: ({ id }) => ({
            url: `/admin/delivery-partners-data/${id}`,
         }),
         providesTags: ["DeliveryPartnerAdmin"],
      }),
      getSingleDeliveryPartnerAdmin: builder.query({
         query: (data) =>
            `/admin/delivery-partner-sales-data/${data?.id}`,
         providesTags: ["DeliveryPartnerAdmin"],
      }),
      postDeliveryPartnerPayment: builder.mutation({
         query: (data) => ({
            url: `/admin/delivery-partner-payment`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (_res, error) =>
            error ? [] : ["DeliveryPartnerAdmin"],
      }),
   }),
});

export const {
   useGetSingleDeliveryPartnerTableAdminQuery,
   useGetSingleDeliveryPartnerAdminQuery,
   usePostDeliveryPartnerPaymentMutation,
} = deliveryPartnerAdminApi;
