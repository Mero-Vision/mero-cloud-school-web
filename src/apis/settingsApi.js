import { mainApi } from "./mainApi";
export const settingsApi = mainApi.injectEndpoints({
  tagTypes: ["Settings"],
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: (params) => ({
        url: `/api/site-setting/${params?.group}`,
      }),
      providesTags: ["Settings"],
    }),
    getSingleSettings: builder.query({
      query: (data) => `/api/site-setting/${data?.id}`,
    }),
    postSettings: builder.mutation({
      query: (data) => ({
        url: `/api/site-setting`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Settings"]),
    }),
    postOpeningBalance: builder.mutation({
      query: (data) => ({
        url: `/api/update-opening-balance`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: (result, error) => (error ? [] : ["Settings"]),
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: `/api/site-setting/${data?.id}`,
        method: "POST",
        body: { ...data, _method: "PATCH" },
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Settings"]),
    }),
    deleteSettings: builder.mutation({
      query: (data) => ({
        url: `/api/site-setting/${data?.key}/${data?.value}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Settings"]),
    }),
    changeSettingsStatus: builder.mutation({
      query: (data) => ({
        url: `/api/site-setting/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Settings"]),
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useGetSingleSettingsQuery,
  usePostSettingsMutation,
  usePostOpeningBalanceMutation,
  useUpdateSettingsMutation,
  useDeleteSettingsMutation,
  useChangeSettingsStatusMutation,
} = settingsApi;
