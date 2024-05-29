import { mainTestApi } from "./testMainApi";
export const testApi = mainTestApi.injectEndpoints({
   tagTypes: ["MenuPerformanceReport"],
   endpoints: (builder) => ({
      getMenuPerformanceReportTest: builder.mutation({
         query: ({ params }) => ({
            url: `/admin/reports/menu-performance-items-excel`,
            params,
            method: "POST",
         }),

         responseHandler: async (response) => {
            console.log({ response });
         },

         // responseHandler: async (response) =>
         //    window.open(
         //       window.URL.createObjectURL(await response.blob()),
         //       "_blank"
         //    ),
         // cache: "no-cache",
         // providesTags: ["MenuPerformanceReport"],
      }),
   }),
});

export const { useGetMenuPerformanceReportTestMutation } = testApi;
