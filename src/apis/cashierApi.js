import { mainApi } from "./mainApi";

export const cashierApi = mainApi.injectEndpoints({
   tagTypes: ["Cashier", "Dashboard"],
   endpoints: (builder) => ({
      getCashier: builder.query({
         query: (params) => ({
            url: `/admin/cashier/today-sales`,
            params,
         }),
         providesTags: ["Cashier"],
      }),
      getCashierHistory: builder.query({
         query: (params) => ({
            url: `/admin/cashier/sales-history`,
            params,
         }),
         providesTags: ["Cashier"],
      }),
      getCashierSession: builder.query({
         query: (params) => ({
            url: `/admin/cashier-session`,
            params,
         }),
         providesTags: ["Cashier"],
      }),
      getCashierSessionActive: builder.query({
         query: (params) => ({
            url: `/admin/cashier-active-session`,
            params,
         }),
         providesTags: ["Cashier"],
      }),
      getCashierSessionCompleted: builder.query({
         query: () => ({
            url: `/admin/cashier-session`,
         }),
         providesTags: ["Cashier"],
      }),
      getSessionStatusCheck: builder.query({
         query: () => `/admin/cashier-session/status/check-session`,
         providesTags: ["Cashier"],
      }),
      getSessionDrawerAmount: builder.query({
         query: () => `/admin/drawer_amounts`,
         providesTags: ["Cashier"],
      }),
      postCashierSessionStart: builder.mutation({
         query: (data) => ({
            url: `/admin/cashier-session`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (res, error) => (error ? [] : ["Cashier"]),
      }),
      postCashierSessionEnd: builder.mutation({
         query: ({ data, id }) => ({
            url: `/admin/cashier-session/${id}`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (_res, error) => (error ? [] : ["Cashier"]),
      }),
      postCashInOut: builder.mutation({
         query: (data) => ({
            url: `/admin/cash-in-out`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (res, error) => (error ? [] : ["Cashier"]),
      }),
      getCashInOut: builder.query({
         query: (params) => ({
            url: `/admin/cash-in-out`,
            params,
         }),
         providesTags: ["Cashier"],
      }),
      updateCashInOut: builder.mutation({
         query: (data) => ({
            url: `/admin/cash-in-out/${data?.id}`,
            method: "POST",
            body: { ...data, _method: "PATCH" },
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Cashier"],
      }),
      deleteCashInOut: builder.mutation({
         query: (id) => ({
            url: `/admin/cash-in-out/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Cashier"],
      }),
      getBusinessSessionStatusCheck: builder.query({
         query: () => `/admin/business-service-session-check`,
         providesTags: ["Cashier"],
      }),
      getBusinessDashboardSessionDataCheck: builder.query({
         query: () => `admin/dashboard/business-session-check`,
         providesTags: ["Cashier"],
      }),
      postBusinessSessionStart: builder.mutation({
         query: (data) => ({
            url: `/admin/business-service-session-start`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (res, error) => (error ? [] : ["Cashier"]),
      }),
      getDayBookBusiness: builder.query({
         query: (params) => ({
            url: `/admin/day-books`,
            params,
         }),
         providesTags: ["Cashier"],
      }),
      getCashierSessionEndToday: builder.query({
         query: (params) => ({
            url: `/admin/cashier-today-session`,
            params,
         }),
         providesTags: ["Cashier"],
      }),
      getCashierSessionSalesToday: builder.query({
         query: (params) => ({
            url: `/admin/cashier-today-sales`,
            params,
         }),
         providesTags: ["Cashier"],
      }),
      postManagerSessionEnd: builder.mutation({
         query: ({ data, id }) => ({
            url: `/admin/business-service-session-start/${id}`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (res, error) => (error ? [] : ["Cashier"]),
      }),
      getDashboardData: builder.query({
         query: (params) => ({
            url: `admin/dashboard`,
            params,
         }),
         providesTags: ["Dashboard"],
      }),
      getOrderSessionCheck: builder.query({
         query: (params) => ({
            url: `/admin/order-session-check`,
            params,
         }),
         providesTags: ["Cashier"],
      }),
      getDashboardSalesByAreaData: builder.query({
         query: (params) => ({
            url: `/admin/dashboard/sales-by-area`,
            params,
         }),
         providesTags: ["Dashboard"],
      }),
      getDashboardPeakTimeDaily: builder.query({
         query: () => ({
            url: `/admin/dashboard/peak-time-by-daily`,
         }),
         providesTags: ["Dashboard"],
      }),
      getDashboardOrdersMonthly: builder.query({
         query: () => ({
            url: `/admin/dashboard/last-30-days-orders`,
         }),
         providesTags: ["Dashboard"],
      }),
      getDashboardSalesMonthly: builder.query({
         query: () => ({
            url: `/admin/dashboard/last-30-days-sales`,
         }),
         providesTags: ["Dashboard"],
      }),
      getDashboardTopSellingTableMonthly: builder.query({
         query: () => ({
            url: `/admin/dashboard/last-30-days-top-selling-tables`,
         }),
         providesTags: ["Dashboard"],
      }),
      getDashboardTopSellingItemsWeekly: builder.query({
         query: ({ id }) => ({
            url: `/admin/dashboard/top-selling-item-by-week?category_id=${id}`,
         }),
         providesTags: ["Dashboard"],
      }),
      getDashboardTopSellingItemsMonthly: builder.query({
         query: ({ id }) => ({
            url: `/admin/dashboard/top-selling-item-by-month?category_id=${id}`,
         }),
         providesTags: ["Dashboard"],
      }),
   }),
});

export const {
   useGetCashierQuery,
   useGetCashierHistoryQuery,
   useGetCashierSessionQuery,
   useGetCashierSessionCompletedQuery,
   useGetCashierSessionActiveQuery,
   useGetSessionStatusCheckQuery,
   useGetSessionDrawerAmountQuery,
   usePostCashierSessionStartMutation,
   usePostCashierSessionEndMutation,
   usePostCashInOutMutation,
   useUpdateCashInOutMutation,
   useDeleteCashInOutMutation,
   useGetCashInOutQuery,
   useGetDayBookBusinessQuery,
   useGetBusinessSessionStatusCheckQuery,
   useGetBusinessDashboardSessionDataCheckQuery,
   usePostBusinessSessionStartMutation,
   useGetCashierSessionEndTodayQuery,
   useGetCashierSessionSalesTodayQuery,
   usePostManagerSessionEndMutation,
   useGetDashboardDataQuery,
   useGetOrderSessionCheckQuery,
   useGetDashboardSalesByAreaDataQuery,
   useGetDashboardPeakTimeDailyQuery,
   useGetDashboardOrdersMonthlyQuery,
   useGetDashboardSalesMonthlyQuery,
   useGetDashboardTopSellingTableMonthlyQuery,
   useGetDashboardTopSellingItemsWeeklyQuery,
   useGetDashboardTopSellingItemsMonthlyQuery,
} = cashierApi;
