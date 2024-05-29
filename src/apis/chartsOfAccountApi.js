import { mainApi } from "./mainApi";
export const chartsOfAccountsApi = mainApi.injectEndpoints({
  tagTypes: ["Charts", "Accounts"],
  endpoints: (builder) => ({
    getAccountHead: builder.query({
      query: (params) => ({
        url: `/api/account-head`,
        params: {
          ...params,
          status: params?.status,
        },
      }),
      providesTags: ["Charts"],
    }),
    getAccountHeadLedger: builder.query({
      query: (params) => ({
        url: `/api/account-head-ledger`,
        params,
      }),
    }),
    getAccountHeadAmount: builder.query({
      query: (params) => ({
        url: `/api/account-head-amount`,
        params,
      }),
    }),
    getAccounts: builder.query({
      query: (params) => ({
        url: `/api/account`,
        params: { account_head_id: params?.id },
      }),
      providesTags: ["Accounts"],
    }),
    getSingleAccountHead: builder.query({
      query: (data) => `/api/account-head/${data?.id}`,
    }),
    getAccountHeadTree: builder.query({
      query: (params) => ({
        url: `api/account-head-tree`,
        params,
      }),
      providesTags: ["Charts"],
    }),
    getAccountHeadChild: builder.query({
      query: (params) => ({
        url: `api/account-head-without-sub`,
        params,
      }),
      providesTags: ["Charts"],
    }),
    postAccountHead: builder.mutation({
      query: (data) => ({
        url: `/api/account-head`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Charts"]),
    }),
    updateAccountHead: builder.mutation({
      query: (data) => ({
        url: `/api/account-head/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(chartsOfAccountsApi.util.invalidateTags(["Charts"]));
      },
    }),
    deleteAccountHead: builder.mutation({
      query: (data) => ({
        url: `/api/account-head/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(chartsOfAccountsApi.util.invalidateTags(["Charts"]));
      },
    }),
  }),
});

export const {
  useGetAccountHeadQuery,
  useGetAccountHeadLedgerQuery,
  useGetAccountHeadAmountQuery,
  useGetSingleAccountHeadQuery,
  useGetAccountHeadTreeQuery,
  useGetAccountHeadChildQuery,
  usePostAccountHeadMutation,
  useUpdateAccountHeadMutation,
  useDeleteAccountHeadMutation,
  useGetAccountsQuery,
} = chartsOfAccountsApi;
