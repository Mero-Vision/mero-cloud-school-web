import { mainApi } from "./mainApi";
const usersBaseUrl = "/api/user";
export const usersApi = mainApi.injectEndpoints({
   tagTypes: ["Users", "SingleUser", "UsersCompany", "UserRole"],
   endpoints: (builder) => ({
      getAllUsers: builder.query({
         query: () => usersBaseUrl,
         providesTags: ["Users"],
      }),
      getUsersCompany: builder.query({
         query: () => `/api/user-company-list`,
         providesTags: ["UsersCompany"],
      }),
      getSingleUser: builder.query({
         query: (data) => usersBaseUrl + `/${data?.id}`,
         providesTags: ["SingleUser"],
      }),
      assignPermission: builder.mutation({
         query: (body) => ({
            url: "/api/assign-permission",
            method: "POST",
            body,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["SingleUser"],
      }),

      getUsersAdmin: builder.query({
         query: ({ params, id }) => ({
            url: `/admin/company/${id}/user`,
            params,
         }),
         providesTags: ["Users"],
      }),
      updateBusiness: builder.mutation({
         query: ({ data, id }) => ({
            url: `/admin/company/${id}`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["SingleUser"],
      }),
      updateBusinessInvoice: builder.mutation({
         query: (data) => ({
            url: `/admin/company/${data?.id}`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["SingleUser"],
      }),
      getSingleUserAdmin: builder.query({
         query: (data) => `/admin/users/${data?.id}`,
         providesTags: ["SingleUser"],
      }),
      getSingleUserInfo: builder.query({
         query: () => `/admin/user-detail`,
         providesTags: ["SingleUser"],
      }),
      postUsersAdmin: builder.mutation({
         query: (data) => ({
            url: `/admin/company/${data?.company_id}/assign-update-user`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Users", "getinvites"],
      }),
      postUsersAdminChangePassword: builder.mutation({
         query: (data) => ({
            url: `/admin/users/change-password`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) => (error ? [] : ["Users"]),
      }),
      postUserChangePassword: builder.mutation({
         query: (data) => ({
            url: `/admin/change-password`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) => (error ? [] : ["Users"]),
      }),
      updateUsersAdmin: builder.mutation({
         query: ({ data, id }) => ({
            url: `/admin/company/${id}/user-data-update`,
            method: "POST",
            body: { ...data, _method: "PUT" },
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Users", "SingleUser"],
      }),
      updateSingleUser: builder.mutation({
         query: (data) => ({
            url: `/admin/update-user-detail`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Users", "SingleUser"],
      }),
      deleteUsersAdmin: builder.mutation({
         query: (id) => ({
            url: `/admin/users/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: (result, error) => (error ? [] : ["Users"]),
      }),

      getUsersRole: builder.query({
         query: (params) => ({
            url: `/admin/role`,
            params,
         }),
         providesTags: ["UserRole"],
      }),

      getSingleRole: builder.query({
         query: (params) => ({
            url: `/admin/role/${params?.id}`,
            params,
         }),
      }),

      postUsersRole: builder.mutation({
         query: (data) => ({
            url: `/admin/role`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Users", "UserRole"],
      }),

      assignPermissionRoles: builder.mutation({
         query: (body) => ({
            url: `/admin/role/${body?.id}/assign-permission`,
            body,
            method: "POST",
         }),
      }),

      updateUsersRole: builder.mutation({
         query: (data) => ({
            url: `/admin/role/${data?.id}`,
            method: "POST",
            body: { ...data, _method: "PATCH" },
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Users", "UserRole"],
      }),
      deleteUsersRole: builder.mutation({
         query: (id) => ({
            url: `/admin/role/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Users", "UserRole"],
      }),

      unassignUser: builder.mutation({
         query: (body) => ({
            url: `/admin/company/${body?.company_id}/unassign-user`,
            body,
            method: "POST",
         }),

         invalidatesTags: (result, error) => (error ? [] : ["Users"]),
      }),

      getInvitation: builder.query({
         query: (params) => ({
            url: `/admin/company/${params?.company_id}/user/invitations`,
            params,
         }),

         providesTags: ["getinvites"],
      }),
      acceptInvitation: builder.mutation({
         query: (body) => ({
            url: "/admin/invitation-accept-reject",
            method: "POST",
            body,
         }),
      }),
      deleteUsersInvitationRole: builder.mutation({
         query: (data) => ({
            url: `/admin/company/${data?.company_id}/user/invitation/${data?.user_id}`,
            method: "DELETE",
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["getinvites"],
      }),
   }),
});

export const {
   useGetUsersCompanyQuery,
   useGetAllUsersQuery,
   useGetSingleUserQuery,
   useAssignPermissionMutation,
   useGetUsersAdminQuery,
   useGetSingleUserAdminQuery,
   usePostUsersAdminMutation,
   usePostUsersAdminChangePasswordMutation,
   usePostUserChangePasswordMutation,
   useUpdateUsersAdminMutation,
   useUpdateSingleUserMutation,
   useUpdateBusinessMutation,
   useUpdateBusinessInvoiceMutation,
   useDeleteUsersAdminMutation,
   useGetUsersRoleQuery,
   usePostUsersRoleMutation,
   useUpdateUsersRoleMutation,
   useDeleteUsersRoleMutation,
   useAcceptInvitationMutation,
   useGetInvitationQuery,
   useUnassignUserMutation,
   useGetSingleRoleQuery,
   useGetSingleUserInfoQuery,
   useAssignPermissionRolesMutation,
   useDeleteUsersInvitationRoleMutation,
} = usersApi;
