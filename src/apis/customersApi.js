import { mainApi } from "./mainApi";
export const customersApi = mainApi.injectEndpoints({
   tagTypes: ["Customers", "SingleCustomer", "CustomersOrderDetail"],
   endpoints: (builder) => ({
      getCustomers: builder.query({
         query: (params) => ({
            url: `/admin/customers`,
            params,
         }),
         providesTags: ["Customers"],
      }),
      getCustomersDue: builder.query({
         query: (status) => ({
            url: `/admin/customers?status=${status}`,
         }),
         providesTags: ["Customers"],
      }),
      getCustomersNotDue: builder.query({
         query: (data) => ({
            url: `/admin/customers?company_id=${data?.company_id}`,
         }),
         providesTags: ["Customers"],
      }),
      getSingleCustomer: builder.query({
         query: (data) => `/admin/customers/${data?.id}`,
         providesTags: ["SingleCustomer", "Customers"],
      }),

      postCustomer: builder.mutation({
         query: (data) => ({
            url: `/admin/customers`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Customers"],
      }),
      updateCustomer: builder.mutation({
         query: (data) => ({
            url: `/admin/customers/${data?.id}`,
            method: "POST",
            body: { ...data, _method: "PATCH" },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(
               customersApi.util.invalidateTags([
                  "Customers",
                  "SingleCustomer",
               ])
            );
         },
      }),
      deleteCustomer: builder.mutation({
         query: (id) => ({
            url: `/admin/customers/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(customersApi.util.invalidateTags(["Customers"]));
         },
      }),
      postCustomerPayment: builder.mutation({
         query: ({ data, id }) => ({
            url: `/admin/customer-partial-payment/${id}`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (res, error) =>
            error ? [] : ["Customers"],
      }),
      getCustomerPartialPaymentOrderItems: builder.query({
         query: ({ id }) =>
            `/admin/customer-partial-payment/order-items/${id}`,
         providesTags: ["Customers"],
      }),
      getCustomersOrderDetail: builder.query({
         query: ({ params, customer_id }) => ({
            url: `/admin/customers/show-orders/${customer_id}`,
            params,
         }),
         providesTags: ["Customers"],
      }),
      getCustomersSingleOrderDetail: builder.query({
         query: (data) => ({
            url: `/admin/show-single-order-data/${data?.id}`,
         }),
         providesTags: ["CustomersOrderDetail"],
      }),
   }),
});

export const {
   useGetCustomersQuery,
   useGetCustomersDueQuery,
   useGetCustomersNotDueQuery,
   useGetSingleCustomerQuery,
   usePostCustomerMutation,
   useUpdateCustomerMutation,
   useDeleteCustomerMutation,
   usePostCustomerPaymentMutation,
   useGetCustomerPartialPaymentOrderItemsQuery,
   useGetCustomersOrderDetailQuery,
   useGetCustomersSingleOrderDetailQuery,
} = customersApi;
