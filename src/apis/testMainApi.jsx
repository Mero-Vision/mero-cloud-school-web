import {
   createApi,
   fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react";
import { getToken } from "../utils/helpers";
// initialize an empty api service that we'll inject endpoints into later as needed
export const mainTestApi = createApi({
   baseQuery: fetchBaseQuery({
      baseUrl: "https://mero-cloud-school.com/api/",
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
   }),
   endpoints: () => ({}),
   //  refetchOnMountOrArgChange: false,
   keepUnusedDataFor: 1,
});
