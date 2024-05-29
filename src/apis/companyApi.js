import { mainApi } from "./mainApi";
const companyBaseUrl = "/api/company";
export const companyApi = mainApi.injectEndpoints({
  tagTypes: [
    "Company",
    "SingleCompany",
    "CompanyUsers",
    "UsersCompany",
    "Dashboard",
    "Invitations",
    "Sales",
  ],
  endpoints: (builder) => ({
    getAllCompany: builder.query({
      query: () => companyBaseUrl,
      providesTags: ["Company"],
    }),
    getCompanyDashboard: builder.query({
      query: () => "/api/dashboard",
      providesTags: ["Dashboard"],
    }),
    getDashboardTotalSales: builder.query({
      query: (params) => ({
        url: "/api/total-sales",
        params,
      }),
      providesTags: ["Sales"],
    }),
    getSingleCompany: builder.query({
      query: (data) => `admin/branch` + `/${data?.id}`,
      providesTags: ["SingleCompany"],
    }),
    createCompany: builder.mutation({
      query: (body) => ({
        url: companyBaseUrl,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Company"]),
    }),
    createCompanyByUser: builder.mutation({
      query: (body) => ({
        // url: "/api/company-by-user",
        url: "/admin/branch",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["Company"]),
    }),

    updateCompany: builder.mutation({
      query: ({ id, body }) => ({
        url: "/admin/branch" + `/${id}`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          companyApi.util.invalidateTags([
            "Company",
            "UsersCompany",
            "SingleCompany",
          ])
        );
      },
    }),

    deleteCompany: builder.mutation({
      query: (id) => ({
        url: companyBaseUrl + `/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(companyApi.util.invalidateTags(["UsersCompany"]));
      },
    }),

    assignCompanyAdmin: builder.mutation({
      query: (body) => ({
        url: "/api/company-admin",
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error) => (error ? [] : ["CompanyUsers"]),
    }),
    createCompanyUser: builder.mutation({
      query: (body) => ({
        url: "/api/create-company-user",
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error) => (error ? [] : ["CompanyUsers"]),
    }),
    updateCompanyUser: builder.mutation({
      query: (body) => ({
        url: "/api/update-company-user",
        method: "POST",
        body,
      }),

      invalidatesTags: (result, error) => (error ? [] : ["CompanyUsers"]),
    }),

    getCompanyUser: builder.query({
      query: (params) => ({
        url: `/api/company-user/${params?.id}`,
        params,
      }),
      providesTags: ["CompanyUsers"],
    }),
    getCompanyInvitations: builder.query({
      query: (params) => ({
        url: `/api/company-user/${params?.id}/invitations`,
        params,
      }),
      providesTags: ["Invitations"],
    }),
    getUsersCompany: builder.query({
      query: () => `/admin/branch`,
      providesTags: ["UsersCompany"],
    }),
    getUsersCompanyBranch: builder.query({
      query: () => `/admin/list-user-branches`,
      providesTags: ["UsersCompany"],
    }),
    getMyInvitations: builder.query({
      query: () => `/admin/my-invitations`,
      providesTags: ["Invitations"],
    }),
    acceptMyInvitation: builder.mutation({
      query: (body) => ({
        url: `/admin/my-invitations/${body?.id}/accept-reject`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Invitations", "UsersCompany"],
    }),
  }),
});

export const {
  useGetAllCompanyQuery,
  useGetCompanyDashboardQuery,
  useCreateCompanyMutation,
  useCreateCompanyByUserMutation,
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useUpdateCompanyUserMutation,
  useCreateCompanyUserMutation,
  useGetCompanyUserQuery,
  useGetUsersCompanyBranchQuery,
  useGetCompanyInvitationsQuery,
  useAssignCompanyAdminMutation,
  useGetUsersCompanyQuery,
  useGetMyInvitationsQuery,
  useAcceptMyInvitationMutation,
  useGetDashboardTotalSalesQuery,
} = companyApi;
