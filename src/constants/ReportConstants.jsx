import Accounting from "../assets/reports/accounting.png";
import Payable from "../assets/reports/payable.png";
import ReceiveMail from "../assets/reports/receive-mail.png";

export const ReportConstants = [
   {
      header: "Hotel",
      icon: Accounting,
      items: [
         { url: "transaction-list" },
         { url: "journal-report" },
         { url: "general-ledger-summary" },
         { url: "detail-general-ledger" },
         { url: "gl-master-report" },
         { url: "trial-balance" },
         { url: "income-statement" },
         { url: "balance-sheet" },
      ],
   },
   {
      header: "Restaurant",
      icon: ReceiveMail,
      items: [
         { url: "daily-report", permission: "report-list" },
         // { url: "daily-income", permission: "report-list" },
         // {
         //   url: "income-by-time",
         //   permission: "report-list",
         // },
         // { url: "sales-by-user", permission: "report-list" },
         // {
         //   url: "sales-by-category",
         //   permission: "report-list",
         // },
         // {
         //   url: "cancelled-orders",
         //   permission: "report-list",
         // },
         { url: "sales-summary", permission: "report-list" },
         {
            url: "floor-&-table-sales-report",
            permission: "report-list",
         },
         {
            url: "menu-performance-report",
            permission: "report-list",
         },
         {
            url: "order-cancellation-report",
            permission: "report-list",
         },
         {
            url: "KOT-BOT-correction-report",
            permission: "report-list",
         },
         {
            url: "menu-rate-history-report",
            permission: "report-list",
         },
         { url: "discount-report", permission: "report-list" },
         { url: "sales-by-item", permission: "report-list" },
         {
            url: "provisional-invoice-report",
            permission: "report-list",
         },
      ],
   },
   {
      header: "Events",
      icon: Payable,
      items: [
         { url: "supplier-payable-summary" },
         { url: "supplier-ageing-summary" },
         { url: "purchase-bill-age" },
         { url: "supplier-statement" },
      ],
   },
];
