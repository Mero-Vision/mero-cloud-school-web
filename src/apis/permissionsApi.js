import { mainApi } from "./mainApi";
const permissionBaseUrl = "/api/permission";
export const permissionsApi = mainApi.injectEndpoints({
  tagTypes: ["Permission"],
  endpoints: (builder) => ({
    getPermissions: builder.query({
      query: (params) => ({
        url: `/admin/permission`,
        params,
      }),
      providesTags: ["Permission"],
    }),

    addPermissions: builder.mutation({
      query: (body) => ({
        url: permissionBaseUrl,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Permission"]),
    }),

    deletePermissions: builder.mutation({
      query: (data) => ({
        url: permissionBaseUrl + `/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Permission"]),
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useAddPermissionsMutation,
  useDeletePermissionsMutation,
} = permissionsApi;
