import { mainApi } from "./mainApi";

export const teachersApi = mainApi.injectEndpoints({
   tagTypes: ["Teachers"],
   endpoints: (builder) => ({
      getTeachers: builder.query({
         query: (params) => ({
            url: `/admin/teachers`,
            params,
         }),
         providesTags: ["Teachers"],
      }),
      getSingleTeachers: builder.query({
         query: (data) => `/admin/teachers/${data?.id}`,
         providesTags: ["Teachers"],
      }),
      postTeachers: builder.mutation({
         query: (data) => ({
            url: `/admin/teachers`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Teachers"],
      }),
      updateTeachers: builder.mutation({
         query: (data) => ({
            url: `/admin/teachers/${data?.id}`,
            method: "POST",
            body: data,
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(teachersApi.util.invalidateTags(["Teachers"]));
         },
      }),
      deleteTeachers: builder.mutation({
         query: (id) => ({
            url: `/admin/teachers/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(teachersApi.util.invalidateTags(["Teachers"]));
         },
      }),
      updateTeachersStatus: builder.mutation({
         query: (data) => ({
            url: `/admin/teachers/update`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Teachers"],
      }),
   }),
});

export const {
   useGetTeachersQuery,
   useGetSingleTeachersQuery,
   usePostTeachersMutation,
   useUpdateTeachersMutation,
   useDeleteTeachersMutation,
   useUpdateTeachersStatusMutation,
} = teachersApi;
