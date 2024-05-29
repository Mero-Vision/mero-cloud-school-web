import { mainApi } from "./mainApi";
export const employeeApi = mainApi.injectEndpoints({
   tagTypes: ["Employees"],
   endpoints: (builder) => ({
      getEmployees: builder.query({
         query: () => `/api/employee`,
         providesTags: ["Employees"],
      }),
      getSingleEmployee: builder.query({
         query: (data) => `/api/employee/${data?.id}`,
      }),
      postEmployee: builder.mutation({
         query: (data) => ({
            url: `/api/employee`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Employees"],
      }),
      updateEmployee: builder.mutation({
         query: (data) => ({
            url: `/api/employee/${data?.id}`,
            method: "POST",
            body: { ...data, _method: "PATCH" },
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Employees"],
      }),
      deleteEmployee: builder.mutation({
         query: (data) => ({
            url: `/api/employee/${data?.id}`,
            method: "DELETE",
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Employees"],
      }),
   }),
});

export const {
   useGetEmployeesQuery,
   useGetSingleEmployeeQuery,
   usePostEmployeeMutation,
   useUpdateEmployeeMutation,
   useDeleteEmployeeMutation,
} = employeeApi;
