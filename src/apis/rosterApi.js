import { mainApi } from "./mainApi";
export const rosterApi = mainApi.injectEndpoints({
   tagTypes: ["Roster"],
   endpoints: (builder) => ({
      // roster_time
      getRosterTime: builder.query({
         query: ({ params, type, page, limit }) => ({
            url: `/admin/roster-time?pagination_limit=${limit}&page=${page}&type=${type}`,
            params,
         }),
         providesTags: ["Roster"],
      }),
      getAllRosterTime: builder.query({
         query: ({ params, type }) => ({
            url: `/admin/roster-time?type=${type}`,
            params,
         }),
         providesTags: ["Roster"],
      }),
      getSingleRosterTime: builder.query({
         query: (data) => `/admin/roster-time/${data?.id}`,
         providesTags: ["Roster"],
      }),
      postRosterTime: builder.mutation({
         query: (data) => ({
            url: `/admin/roster-time`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Roster"],
      }),
      updateRosterTime: builder.mutation({
         query: (data) => ({
            url: `/admin/roster-time/${data?.id}`,
            method: "POST",
            body: { ...data, _method: "PATCH" },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(rosterApi.util.invalidateTags(["Roster"]));
         },
      }),
      deleteRosterTime: builder.mutation({
         query: (id) => ({
            url: `/admin/roster-time/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(rosterApi.util.invalidateTags(["Roster"]));
         },
      }),

      // roster_task
      getRosterTask: builder.query({
         query: ({ params, type, page, limit }) => ({
            url: `/admin/roster-task?pagination_limit=${limit}&page=${page}&type=${type}`,
            params,
         }),
         providesTags: ["Roster"],
      }),
      getAllRosterTask: builder.query({
         query: ({ params, type }) => ({
            url: `/admin/roster-task?type=${type}`,
            params,
         }),
         providesTags: ["Roster"],
      }),
      getSingleRosterTask: builder.query({
         query: (data) => `/admin/roster-task/${data?.id}`,
         providesTags: ["Roster"],
      }),
      postRosterTask: builder.mutation({
         query: (data) => ({
            url: `/admin/roster-task`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Roster"],
      }),
      updateRosterTask: builder.mutation({
         query: (data) => ({
            url: `/admin/roster-task/${data?.id}`,
            method: "POST",
            body: { ...data, _method: "PATCH" },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(rosterApi.util.invalidateTags(["Roster"]));
         },
      }),
      deleteRosterTask: builder.mutation({
         query: (id) => ({
            url: `/admin/roster-task/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(rosterApi.util.invalidateTags(["Roster"]));
         },
      }),

      // roster
      getRestaurantRoster: builder.query({
         query: ({ params, date }) => ({
            url: `/admin/restaurant-roster?date=${date}`,
            params,
         }),
         providesTags: ["Roster"],
      }),
      getRestaurantRosterFloorPlan: builder.query({
         query: ({ params, date }) => ({
            url: `/admin/restaurant-floor-plan?date=${date}`,
            params,
         }),
         providesTags: ["Roster"],
      }),
      postRestaurantRoster: builder.mutation({
         query: (data) => ({
            url: `/admin/restaurant-roster`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Roster"],
      }),
      updateRestaurantRoster: builder.mutation({
         query: (data) => ({
            url: `/admin/restaurant-roster/update`,
            method: "POST",
            body: data,
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(rosterApi.util.invalidateTags(["Roster"]));
         },
      }),
   }),
});

export const {
   useGetRosterTimeQuery,
   useGetAllRosterTimeQuery,
   useGetSingleRosterTimeQuery,
   usePostRosterTimeMutation,
   useUpdateRosterTimeMutation,
   useDeleteRosterTimeMutation,
   useGetRosterTaskQuery,
   useGetAllRosterTaskQuery,
   useGetSingleRosterTaskQuery,
   usePostRosterTaskMutation,
   useUpdateRosterTaskMutation,
   useDeleteRosterTaskMutation,
   useGetRestaurantRosterQuery,
   useGetRestaurantRosterFloorPlanQuery,
   usePostRestaurantRosterMutation,
   useUpdateRestaurantRosterMutation,
} = rosterApi;
