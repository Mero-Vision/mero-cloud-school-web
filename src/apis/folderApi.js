import { mainApi } from "./mainApi";
export const folderApi = mainApi.injectEndpoints({
  tagTypes: ["Folder", "SingleFolder"],
  endpoints: (builder) => ({
    getFolders: builder.query({
      query: (params) => ({
        url: `/api/folder`,
        params,
      }),
      providesTags: ["Folder"],
    }),
    getCompanyFolders: builder.query({
      query: (params) => ({
        url: `/api/get-firm-company-folders`,
        params,
      }),
      providesTags: ["CompanyFolder"],
    }),
    getSingleFolder: builder.query({
      query: (data) => `/api/folder/${data?.id}`,
      providesTags: ["SingleFolder"],
    }),
    getMedia: builder.query({
      query: (data) => ({
        url: `/api/get-media/${data?.id}`,

        responseHandler: async (response) =>
          window.open(
            window.URL.createObjectURL(await response.blob()),
            "_blank"
          ),
        cache: "no-cache",
      }),
      // providesTags: ["SingleFolder"],
    }),
    postFolder: builder.mutation({
      query: (data) => ({
        url: `/api/folder`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["SingleFolder"]),
    }),
    postFiles: builder.mutation({
      query: (data) => ({
        url: `/api/folder/${data?.id}/store-files`,
        method: "POST",
        body: data?.data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["SingleFolder"]),
    }),
    renameFiles: builder.mutation({
      query: (data) => ({
        url: `/api/file/${data?.id}/rename`,
        method: "POST",
        body: data?.data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(folderApi.util.invalidateTags(["SingleFolder"]));
      },
    }),
    renameFolder: builder.mutation({
      query: (data) => ({
        url: `/api/folder/${data?.id}/rename`,
        method: "POST",
        body: data?.data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(folderApi.util.invalidateTags(["SingleFolder"]));
      },
    }),
    deleteFolder: builder.mutation({
      query: (data) => ({
        url: `/api/folder/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(folderApi.util.invalidateTags(["SingleFolder"]));
      },
    }),
    deleteFile: builder.mutation({
      query: (data) => ({
        url: `/api/file/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(folderApi.util.invalidateTags(["SingleFolder"]));
      },
    }),
  }),
});

export const {
  useGetFoldersQuery,
  useGetCompanyFoldersQuery,
  useGetSingleFolderQuery,
  useGetMediaQuery,
  usePostFolderMutation,
  usePostFilesMutation,
  useRenameFilesMutation,
  useRenameFolderMutation,
  useDeleteFolderMutation,
  useDeleteFileMutation,
} = folderApi;
