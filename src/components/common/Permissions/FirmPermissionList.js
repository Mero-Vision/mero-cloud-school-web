// export const FirmPermissionList = [
//   {
//     name: "dashboard",
//     data: [
//       {
//         name: "view-accountingfirm-dashboard",
//       },
//     ],
//   },
//   {
//     name: "company",
//     data: [
//       {
//         name: "company-list",
//       },
//       {
//         name: "company-create",
//       },
//       {
//         name: "company-view",
//       },
//       {
//         name: "company-update",
//       },
//       {
//         name: "company-delete",
//       },
//       {
//         name: "company-update-user",
//       },
//       {
//         name: "company-list-user",
//       },
//       {
//         name: "company-assign-admin",
//       },
//     ],
//   },
//   {
//     name: "accounting-firm",
//     data: [
//       {
//         name: "accountingfirm-user-list",
//       },
//       {
//         name: "accountingfirm-user-create",
//       },
//       {
//         name: "accountingfirm-user-view",
//       },
//       {
//         name: "accountingfirm-user-update",
//       },
//       {
//         name: "accountingfirm-user-delete",
//       },
//     ],
//   },
// ];

export const FirmPermissionList = [
  {
    name: "dashboard",
    data: ["view-accountingfirm-dashboard"],
  },
  {
    name: "company",
    data: [
      "company-create",
      "company-view",
      "company-update",
      "company-delete",
      "company-update-user",
      "company-assign-admin",
    ],
  },
  {
    name: "accounting-firm",
    data: [
      "accountingfirm-user-create",
      "accountingfirm-user-view",
      "accountingfirm-user-update",
      "accountingfirm-user-delete",
    ],
  },
];
