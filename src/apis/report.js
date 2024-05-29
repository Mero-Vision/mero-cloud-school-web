import { mainApi } from "./mainApi";

export const reportApi = mainApi.injectEndpoints({
   tagTypes: ["Report"],
   endpoints: (builder) => ({
      getDailyIncome: builder.query({
         query: (params) => ({
            url: `/admin/reports/daily-income`,
            params,
         }),
         providesTags: ["Report"],
      }),
      getDailyReport: builder.query({
         query: (params) => ({
            url: `/admin/reports/daily-reports`,
            params,
         }),
         providesTags: ["Report"],
      }),
      getSaleByUser: builder.query({
         query: () => `/admin/reports/sales-by-user`,
         providesTags: ["Report"],
      }),
      getSaleByCategory: builder.query({
         query: () => `/admin/reports/sales-by-category`,
         providesTags: ["Report"],
      }),
      getIncomeByTime: builder.query({
         query: (data) =>
            `/admin/reports/income-by-time?date=${data?.date}`,
         providesTags: ["Report"],
      }),
      getCancelledOrders: builder.query({
         query: () => `/admin/reports/cancelled-orders`,
         providesTags: ["Report"],
      }),
   }),
});

export const {
   useGetDailyIncomeQuery,
   useGetDailyReportQuery,
   useGetSaleByUserQuery,
   useGetSaleByCategoryQuery,
   useGetIncomeByTimeQuery,
   useGetCancelledOrdersQuery,
} = reportApi;
