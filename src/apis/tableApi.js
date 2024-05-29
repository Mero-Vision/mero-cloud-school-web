import { mainApi } from "./mainApi";
export const tableApi = mainApi.injectEndpoints({
   tagTypes: ["Table"],
   endpoints: (builder) => ({
      getTable: builder.query({
         query: (params) => ({
            url: `/admin/tables`,
            params,
         }),
         providesTags: ["Table"],
      }),
      getSingleTable: builder.query({
         query: (data) => `/admin/tables/${data?.id}`,
         providesTags: ["Table"],
      }),
      postTable: builder.mutation({
         query: (data) => ({
            url: `/admin/tables`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) => (error ? [] : ["Table"]),
      }),
      updateTable: builder.mutation({
         query: (data) => ({
            url: `/admin/tables/${data?.id}`,
            method: "POST",
            body: data,
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(tableApi.util.invalidateTags(["Table"]));
         },
      }),
      deleteTable: builder.mutation({
         query: (id) => ({
            url: `/admin/tables/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(tableApi.util.invalidateTags(["Table"]));
         },
      }),
      updateTableStatus: builder.mutation({
         query: (data) => ({
            url: `/admin/table/update/show-table-status`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) => (error ? [] : ["Table"]),
      }),
   }),
});

export const {
   useGetTableQuery,
   useGetSingleTableQuery,
   usePostTableMutation,
   useUpdateTableMutation,
   useDeleteTableMutation,
   useUpdateTableStatusMutation,
} = tableApi;
