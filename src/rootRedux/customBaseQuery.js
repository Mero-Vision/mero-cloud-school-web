import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/helpers";
const baseQuery = fetchBaseQuery({
   baseUrl: import.meta.env.VITE_BASE_URL,
   prepareHeaders: (headers) => {
      const token = getToken()?.access_token;
      if (token) {
         headers?.set("Authorization", `Bearer ${token}`);
         headers?.set(
            "branch-id",
            JSON.parse(localStorage.getItem("company"))?.id
         );
         headers?.set(
            "accounting_firm_id",
            JSON.parse(localStorage.getItem("user"))
               ?.accounting_firms?.[0]?.id
         );
         headers?.set("Accept", "application/json");

         return headers;
      } else {
         headers?.set("Accept", "application/json");
      }
   },
});

export const customBaseQuery = () => {
   const baseQueryWithReauth = async (args, api, extraOptions) => {
      let result = await baseQuery(args, api, extraOptions);

      console.log({ apiiiiiiiiiiiiiiii: api, result, args });
      if (result?.error && result?.error?.status === 401) {
         // customToaster({
         //    type: "danger",
         //    message: result?.error?.data?.message,
         // });
         localStorage.clear();
         // window.location.replace("/login");
      }
      return result;
   };
   return baseQueryWithReauth;
};

// export const customBaseQuery = () => {
//   return fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_BASE_URL,
//     prepareHeaders: (headers) => {
//       const token = getToken()?.access_token;
//       if (token) {
//         headers?.set("Authorization", `Bearer ${token}`);
//         headers?.set(
//           "company-id",
//           JSON.parse(localStorage.getItem("company"))?.id
//         );
//         return headers;
//       } else {
//         // handleAuthErrors();
//       }
//     },
//   });
// };
