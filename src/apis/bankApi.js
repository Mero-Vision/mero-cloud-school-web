import { mainApi } from "./mainApi";

export const bankApi = mainApi.injectEndpoints({
   tagTypes: ["Banks"],
   endpoints: (builder) => ({
      getBanks: builder.query({
         query: (params) => ({ url: `/api/bank`, params }),
         providesTags: ["Banks"],
      }),
      getSingleBank: builder.query({
         query: (data) => `/api/bank/${data?.id}`,
      }),
      postBank: builder.mutation({
         query: (data) => ({
            url: `/api/bank`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) => (error ? [] : ["Banks"]),
      }),
      updateBank: builder.mutation({
         query: (data) => ({
            url: `/api/bank/${data?.id}`,
            method: "POST",
            body: data?.data,
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(bankApi.util.invalidateTags(["Banks"]));
         },
      }),
      deleteBank: builder.mutation({
         query: (data) => ({
            url: `/api/bank/${data?.id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(bankApi.util.invalidateTags(["Banks"]));
         },
      }),
   }),
});

export const {
   useGetBanksQuery,
   useGetSingleBankQuery,
   usePostBankMutation,
   useUpdateBankMutation,
   useDeleteBankMutation,
} = bankApi;
