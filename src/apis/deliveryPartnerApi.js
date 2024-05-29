import { mainApi } from "./mainApi";
export const deliveryPartnerApi = mainApi.injectEndpoints({
   tagTypes: ["DeliveryPartner"],
   endpoints: (builder) => ({
      getDeliveryPartner: builder.query({
         query: (params) => ({
            url: `/admin/delivery-partner`,
            params,
         }),
         providesTags: ["DeliveryPartner"],
      }),
      getAllDeliveryPartner: builder.query({
         query: (params) => ({
            url: `/admin/delivery-partner`,
            params,
         }),

         providesTags: ["DeliveryPartner"],
      }),
      getAllDeliveryPartnerPos: builder.query({
         query: (params) => ({
            url: `/admin/pos/delivery-partner`,
            params,
         }),

         providesTags: ["DeliveryPartner"],
      }),

      postDeliveryPartner: builder.mutation({
         query: (data) => ({
            url: `/admin/delivery-partner`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["DeliveryPartner"],
      }),
      updateDeliveryPartner: builder.mutation({
         query: ({ data, slug }) => ({
            url: `/admin/delivery-partner/${slug}`,
            method: "POST",
            body: data,
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(
               deliveryPartnerApi.util.invalidateTags([
                  "DeliveryPartner",
               ])
            );
         },
      }),
      deleteDeliveryPartner: builder.mutation({
         query: (id) => ({
            url: `/admin/delivery-partner/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(
               deliveryPartnerApi.util.invalidateTags([
                  "DeliveryPartner",
               ])
            );
         },
      }),
      updateDeliveryPartnerStatus: builder.mutation({
         query: (data) => ({
            url: `/admin/delivery-partner/update/status`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["DeliveryPartner"],
      }),
   }),
});

export const {
   useGetDeliveryPartnerQuery,
   useGetAllDeliveryPartnerQuery,
   useGetAllDeliveryPartnerPosQuery,
   usePostDeliveryPartnerMutation,
   useUpdateDeliveryPartnerMutation,
   useDeleteDeliveryPartnerMutation,
   useUpdateDeliveryPartnerStatusMutation,
} = deliveryPartnerApi;
