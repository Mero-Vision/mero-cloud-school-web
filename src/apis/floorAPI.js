import { mainApi } from "./mainApi";
export const floorApi = mainApi.injectEndpoints({
   tagTypes: ["Floor"],
   endpoints: (builder) => ({
      getFloor: builder.query({
         query: (params) => ({
            url: `/admin/floors`,
            params,
         }),
         providesTags: ["Floor"],
      }),
      getFloorPos: builder.query({
         query: (params) => ({
            url: `/admin/pos/floors`,
            params,
         }),
         providesTags: ["Floor"],
      }),
      getAllFloor: builder.query({
         query: ({ params, company_id }) => ({
            url: `/admin/floors?company_id=${company_id}`,
            params,
         }),
         providesTags: ["Floor"],
      }),
      getSingleFloor: builder.query({
         query: (data) => `/admin/floors/${data?.id}`,
         providesTags: ["Floor"],
      }),
      postFloor: builder.mutation({
         query: (data) => ({
            url: `/admin/floors`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) => (error ? [] : ["Floor"]),
      }),
      updateFloor: builder.mutation({
         query: (data) => ({
            url: `/admin/floors/${data?.id}`,
            method: "POST",
            body: { ...data, _method: "PATCH" },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(floorApi.util.invalidateTags(["Floor"]));
         },
      }),
      deleteFloor: builder.mutation({
         query: (id) => ({
            url: `/admin/floors/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(floorApi.util.invalidateTags(["Floor"]));
         },
      }),
      postChangeOrderTable: builder.mutation({
         query: (data) => ({
            url: `/admin/change-order-table`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (res, error) => (error ? [] : ["Floor"]),
      }),
   }),
});

export const {
   useGetFloorQuery,
   useGetFloorPosQuery,
   useGetAllFloorQuery,
   useGetSingleFloorQuery,
   usePostFloorMutation,
   useUpdateFloorMutation,
   useDeleteFloorMutation,
   usePostChangeOrderTableMutation,
} = floorApi;
