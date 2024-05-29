import { mainApi } from "./mainApi";

export const bankTransferApi = mainApi.injectEndpoints({
  tagTypes: ["Banks"],
  endpoints: (builder) => ({
    postDeposit: builder.mutation({
      query: (data) => ({
        url: `/api/deposite`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Banks"]),
    }),
    postWithdraw: builder.mutation({
      query: (data) => ({
        url: `/api/withdraw`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Banks"]),
    }),
  }),
});

export const { usePostDepositMutation, usePostWithdrawMutation } =
  bankTransferApi;
