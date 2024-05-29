import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { customBaseQuery } from "../rootRedux/customBaseQuery";
// initialize an empty api service that we'll inject endpoints into later as needed
export const mainApi = createApi({
   baseQuery: customBaseQuery(),
   endpoints: () => ({}),
   //  refetchOnMountOrArgChange: false,
   keepUnusedDataFor: 1,
});
