import { mainApi } from "./mainApi";

const firmBaseUrl = `/api/accounting-firm`;
export const accountingFirmApi = mainApi.injectEndpoints({
  tagTypes: ["Firm", "SingleFirm", "FirmUsers"],
  endpoints: (builder) => ({
    getAccountingFirms: builder.query({
      query: (params) => ({ url: firmBaseUrl, params }),
      providesTags: ["Firm"],
    }),
    getSingleFirm: builder.query({
      query: (data) => firmBaseUrl + `/${data?.id}`,
      providesTags: ["SingleFirm"],
    }),
    createFirm: builder.mutation({
      query: (body) => ({
        url: firmBaseUrl,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Firm"]),
    }),

    updateFirm: builder.mutation({
      query: ({ id, data }) => ({
        url: firmBaseUrl + `/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["SingleFirm"]),
    }),

    deleteFirm: builder.mutation({
      query: (id) => ({
        url: firmBaseUrl + `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Firm"]),
    }),

    assignFirmAdmin: builder.mutation({
      query: (body) => ({
        url: "/api/accounting-firm-admin",
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error) => (error ? [] : ["FirmUsers"]),
    }),
    createFirmUser: builder.mutation({
      query: (body) => ({
        url: "/api/create-accounting-firm-user",
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error) => (error ? [] : ["FirmUsers"]),
    }),
    updateFirmUser: builder.mutation({
      query: (body) => ({
        url: "/api/update-accounting-firm-user",
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error) => (error ? [] : ["FirmUsers"]),
    }),

    getFirmUser: builder.query({
      query: (data) => ({
        url: `/api/accounting-firm-user/${data?.id}`,
      }),
      providesTags: ["FirmUsers"],
    }),
  }),
});

export const {
  useGetAccountingFirmsQuery,
  useCreateFirmMutation,
  useGetSingleFirmQuery,
  useUpdateFirmMutation,
  useDeleteFirmMutation,
  useUpdateFirmUserMutation,
  useCreateFirmUserMutation,
  useGetFirmUserQuery,
  useAssignFirmAdminMutation,
} = accountingFirmApi;
