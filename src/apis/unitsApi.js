import { mainApi } from "./mainApi";
export const unitsApi = mainApi.injectEndpoints({
   tagTypes: ["Units"],
   endpoints: (builder) => ({
      getUnits: builder.query({
         query: (params) => ({
            url: `/admin/unit-measurements`,
            params,
         }),
         providesTags: ["Units"],
      }),
      getSingleUnit: builder.query({
         query: (data) => ({
            url: `/admin/unit-measurements/${data?.id}`,
         }),
      }),
      postUnit: builder.mutation({
         query: (data) => ({
            url: `/admin/unit-measurements`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) => (error ? [] : ["Units"]),
      }),
      updateUnit: builder.mutation({
         query: (data) => ({
            url: `/admin/unit-measurements/${data?.id}`,
            method: "POST",
            body: { ...data, _method: "PATCH" },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(unitsApi.util.invalidateTags(["Units"]));
         },
      }),
      deleteUnit: builder.mutation({
         query: (data) => ({
            url: `/admin/unit-measurements/${data?.id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(unitsApi.util.invalidateTags(["Units"]));
         },
      }),
   }),
});

export const {
   useGetUnitsQuery,
   useGetSingleUnitQuery,
   usePostUnitMutation,
   useUpdateUnitMutation,
   useDeleteUnitMutation,
} = unitsApi;
