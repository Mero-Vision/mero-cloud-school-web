import { mainApi } from "./mainApi";
export const businessApi = mainApi.injectEndpoints({
   tagTypes: ["Business"],
   endpoints: (builder) => ({
      getBusiness: builder.query({
         query: () => ({
            url: `/admin/company-details`,
         }),
         providesTags: ["Business"],
      }),

      // updateBusiness: builder.mutation({
      //    query: (data) => ({
      //       url: `/admin/company/${data?.id}`,
      //       method: "POST",
      //       body: { ...data, _method: "PATCH" },
      //    }),
      //    async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //       await queryFulfilled;
      //       dispatch(businessApi.util.invalidateTags(["Business"]));
      //    },
      // }),
   }),
});

export const { useGetBusinessQuery } = businessApi;
