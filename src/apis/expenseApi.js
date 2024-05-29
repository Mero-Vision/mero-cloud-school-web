import { mainApi } from "./mainApi";
export const expenseApi = mainApi.injectEndpoints({
  tagTypes: ["Expense", "SingleExpense"],
  endpoints: (builder) => ({
    getExpense: builder.query({
      query: (params) => ({ url: `/api/expense`, params }),
      providesTags: ["Expense"],
    }),
    getSingleExpense: builder.query({
      query: (data) => `/api/expense/${data?.id}`,
      providesTags: ["SingleExpense"],
      keepUnusedDataFor: 1,
    }),
    postExpense: builder.mutation({
      query: (data) => ({
        url: `/api/expense`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Expense"]),
    }),
    updateExpense: builder.mutation({
      query: (data) => ({
        url: `/api/expense/${data?.id}`,
        method: "POST",
        body: data?.data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(expenseApi.util.invalidateTags(["Expense"]));
      },
    }),
    deleteExpense: builder.mutation({
      query: (data) => ({
        url: `/api/expense/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(expenseApi.util.invalidateTags(["Expense"]));
      },
    }),
    changeExpenseStatus: builder.mutation({
      query: (data) => ({
        url: `/api/expense/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(expenseApi.util.invalidateTags(["Expense", "SingleExpense"]));
      },
    }),
  }),
});

export const {
  useGetExpenseQuery,
  useGetSingleExpenseQuery,
  usePostExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useChangeExpenseStatusMutation,
} = expenseApi;
