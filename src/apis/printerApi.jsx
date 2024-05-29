import { mainApi } from "./mainApi";
export const printerApi = mainApi.injectEndpoints({
   tagTypes: ["Printers"],
   endpoints: (builder) => ({
      getPrinters: builder.query({
         query: (params) => ({
            url: `/admin/printers`,
            params,
         }),
         providesTags: ["Printers"],
      }),

      postPrinters: builder.mutation({
         query: (data) => ({
            url: `/admin/printers`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Printers"],
      }),
      updatePrinters: builder.mutation({
         query: ({ data, id }) => ({
            url: `/admin/printers/${id}`,
            method: "POST",
            body: { ...data, _method: "PUT" },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(printerApi.util.invalidateTags(["Printers"]));
         },
      }),
      deletePrinters: builder.mutation({
         query: (id) => ({
            url: `/admin/printers/${id}`,
            method: "DELETE",
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            await queryFulfilled;
            dispatch(printerApi.util.invalidateTags(["Printers"]));
         },
      }),
   }),
});

export const {
   useGetPrintersQuery,
   usePostPrintersMutation,
   useUpdatePrintersMutation,
   useDeletePrintersMutation,
} = printerApi;
