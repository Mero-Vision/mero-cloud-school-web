import { mainApi } from "./mainApi";
export const humanResourceApi = mainApi.injectEndpoints({
   tagTypes: ["Position", "Department", "Employee"],
   endpoints: (builder) => ({
      // positions
      getPosition: builder.query({
         query: ({ params, company_id }) => ({
            url: `/admin/positions?company_id=${company_id}`,
            params,
         }),
         providesTags: ["Position"],
      }),
      getSinglePosition: builder.query({
         query: (data) => `/admin/positions/${data?.id}`,
         providesTags: ["Position"],
      }),
      postPosition: builder.mutation({
         query: (data) => ({
            url: `/admin/positions`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Position"],
      }),
      updatePosition: builder.mutation({
         query: (data) => ({
            url: `/admin/positions/${data?.id}`,
            method: "POST",
            body: { ...data, _method: "PATCH" },
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Position"],
      }),
      deletePosition: builder.mutation({
         query: (id) => ({
            url: `/admin/positions/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Position"],
      }),

      // departments
      getDepartment: builder.query({
         query: ({ params, company_id }) => ({
            url: `/admin/departments?company_id=${company_id}`,
            params,
         }),
         providesTags: ["Department"],
      }),
      getSingleDepartment: builder.query({
         query: (data) => `/admin/departments/${data?.id}`,
         providesTags: ["Department"],
      }),
      postDepartment: builder.mutation({
         query: (data) => ({
            url: `/admin/departments`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Department"],
      }),
      updateDepartment: builder.mutation({
         query: (data) => ({
            url: `/admin/departments/${data?.id}`,
            method: "POST",
            body: { ...data, _method: "PATCH" },
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Department"],
      }),
      deleteDepartment: builder.mutation({
         query: (id) => ({
            url: `/admin/departments/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Department"],
      }),

      // employee
      getEmployee: builder.query({
         query: (params) => ({
            url: `/admin/employees`,
            params,
         }),
         providesTags: ["Employee"],
      }),

      getEmployeeDayBookData: builder.query({
         query: (data) => `/admin/employees/daybook-data/${data?.id}`,
         providesTags: ["Employee"],
      }),
      getEmployeeShortNames: builder.query({
         query: ({ params, company_id }) => ({
            url: `/admin/employees?company_id=${company_id}`,
            params,
         }),
         providesTags: ["Employee"],
         transformResponse: (response, meta, arg) => {
            return response.data.map((employee) => ({
               id: employee?.id,
               shortName: employee.short_name,
            }));
         },
      }),
      getSingleEmployee: builder.query({
         query: (data) => `/admin/employees/${data?.id}`,
         providesTags: ["Employee"],
      }),
      postEmployee: builder.mutation({
         query: (data) => ({
            url: `/admin/employees`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Employee"],
      }),
      updateEmployee: builder.mutation({
         query: (data) => ({
            url: `/admin/employees/${data?.id}`,
            method: "POST",
            body: { ...data, _method: "PATCH" },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(
               humanResourceApi.util.invalidateTags(["Employee"])
            );
         },
      }),
      deleteEmployee: builder.mutation({
         query: (id) => ({
            url: `/admin/employees/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(
               humanResourceApi.util.invalidateTags(["Employee"])
            );
         },
      }),
   }),
});

export const {
   useGetPositionQuery,
   useGetSinglePositionQuery,
   usePostPositionMutation,
   useUpdatePositionMutation,
   useDeletePositionMutation,
   useGetDepartmentQuery,
   useGetSingleDepartmentQuery,
   usePostDepartmentMutation,
   useUpdateDepartmentMutation,
   useDeleteDepartmentMutation,
   useGetEmployeeQuery,
   useGetEmployeeShortNamesQuery,
   useGetSingleEmployeeQuery,
   useGetEmployeeDayBookDataQuery,
   usePostEmployeeMutation,
   useUpdateEmployeeMutation,
   useDeleteEmployeeMutation,
} = humanResourceApi;
