import { mainApi } from "./mainApi";
export const reportsApi = mainApi.injectEndpoints({
   tagTypes: [
      "Reports",
      "Balance",
      "TrialBalance",
      "MenuRate",
      "KOTBOT",
      "DiscountReport",
      "OrderCancellation",
      "SalesByItem",
      "ProvisionalInvoice",
   ],
   endpoints: (builder) => ({
      getReports: builder.query({
         query: (params) => ({
            url: `/api/report`,
            params,
         }),
         providesTags: ["Reports"],
      }),

      getMenuPerformanceItems: builder.query({
         query: (params) => ({
            url: `/admin/reports/menu-performance-items`,
            params,
         }),
         providesTags: ["MenuPerformance"],
      }),
      getMenuPerformanceSummary: builder.query({
         query: (params) => ({
            url: `/admin/reports/menu-performance-summary`,
            params,
         }),
         providesTags: ["MenuPerformanceSummary"],
      }),
      getMenuPerformanceReport: builder.mutation({
         query: ({ params }) => ({
            url: `/admin/reports/menu-performance-items-excel`,
            params,
            method: "POST",
            responseType: "blob",
         }),
         responseHandler: async (response) =>
            window.open(
               window.URL.createObjectURL(await response.blob()),
               "_blank"
            ),
         cache: "no-cache",
         providesTags: ["MenuPerformanceReport"],
      }),
      getTrialBalance: builder.query({
         query: (params) => ({
            url: `/api/trial-balance`,
            params,
         }),
         providesTags: ["TrialBalance"],
      }),
      getBalanceSheet: builder.query({
         query: (params) => ({
            url: `/api/balance-sheet`,
            params,
         }),
         providesTags: ["Balance"],
      }),
      getSalesRegister: builder.query({
         query: (params) => ({
            url: `/api/sale-register`,
            params,
         }),
         providesTags: ["SalesRegister"],
      }),
      getPurchaseRegister: builder.query({
         query: (params) => ({
            url: `/api/purchase-register`,
            params,
         }),
         providesTags: ["PurchaseRegister"],
      }),

      // Menu rate history

      getMenuRateHistoryItems: builder.query({
         query: (params) => ({
            url: `/admin/reports/menu-rate-history`,
            params,
         }),
         providesTags: ["MenuRate"],
      }),

      // KOT / BOT Correction

      getKotBotCorrectionItems: builder.query({
         query: (params) => ({
            url: `/admin/reports/kot-bot-correction-history`,
            params,
         }),
         providesTags: ["KOTBOT"],
      }),
      getKotBotCorrectionSummary: builder.query({
         query: (params) => ({
            url: `/admin/reports/kot-bot-correction-history-summary`,
            params,
         }),
         providesTags: ["KOTBOT"],
      }),

      // Discount Report

      getDiscountReportItems: builder.query({
         query: (params) => ({
            url: `/admin/reports/discount-amount-report`,
            params,
         }),
         providesTags: ["DiscountReport"],
      }),
      getDiscountReportSummary: builder.query({
         query: (params) => ({
            url: `/admin/reports/discount-amount-report-summary`,
            params,
         }),
         providesTags: ["DiscountReport"],
      }),

      // sales summary

      getSalesSummaryItems: builder.query({
         query: (params) => ({
            url: `/admin/reports/sales-summary-item`,
            params,
         }),
         providesTags: ["SalesSummary"],
      }),
      getSalesSummary: builder.query({
         query: (params) => ({
            url: `/admin/reports/sales-summary`,
            params,
         }),
         providesTags: ["SalesSummary"],
      }),

      // order cancellation report

      getOrderCancellationItems: builder.query({
         query: (params) => ({
            url: `/admin/reports/order-cancellation-report`,
            params,
         }),
         providesTags: ["OrderCancellation"],
      }),
      getOrderCancellationSummary: builder.query({
         query: (params) => ({
            url: `/admin/reports/order-cancellation-report-summary`,
            params,
         }),
         providesTags: ["OrderCancellation"],
      }),

      // floor and table report

      getFloorTableItems: builder.query({
         query: (params) => ({
            url: `/admin/reports/floor-table-sales-report`,
            params,
         }),
         providesTags: ["FloorTable"],
      }),
      getFloorTableSummary: builder.query({
         query: (params) => ({
            url: `/admin/reports/floor-table-sales-report-summary`,
            params,
         }),
         providesTags: ["FloorTable"],
      }),

      // Sales by item report

      getSalesByItems: builder.query({
         query: (params) => ({
            url: `/admin/reports/sales-by-item`,
            params,
         }),
         providesTags: ["SalesByItem"],
      }),

      // Provisional invoice report

      getProvisionalInvoiceItems: builder.query({
         query: (params) => ({
            url: `/admin/reports/provisional-invoice`,
            params,
         }),
         providesTags: ["ProvisionalInvoice"],
      }),
   }),
});

export const {
   useGetReportsQuery,
   useGetTrialBalanceQuery,
   useGetBalanceSheetQuery,
   useGetSalesRegisterQuery,
   useGetPurchaseRegisterQuery,
   useGetSalesSummaryQuery,
   useGetSalesSummaryItemsQuery,
   useGetMenuPerformanceItemsQuery,
   useGetMenuPerformanceSummaryQuery,
   useGetMenuPerformanceReportMutation,
   useGetMenuRateHistoryItemsQuery,
   useGetKotBotCorrectionItemsQuery,
   useGetKotBotCorrectionSummaryQuery,
   useGetDiscountReportItemsQuery,
   useGetDiscountReportSummaryQuery,
   useGetOrderCancellationItemsQuery,
   useGetOrderCancellationSummaryQuery,
   useGetFloorTableItemsQuery,
   useGetFloorTableSummaryQuery,
   useGetSalesByItemsQuery,
   useGetProvisionalInvoiceItemsQuery,
} = reportsApi;
