import { mainApi } from "./mainApi";

const mainUrl = "/api/bug";
const feedbackUrl = "/api/bug-feedback";

export const bugFeedbackApi = mainApi.injectEndpoints({
  tagTypes: ["bugs"],

  endpoints: (builder) => ({
    getBugs: builder.query({
      query: (params) => ({
        url: mainUrl,
        params,
      }),
      providesTags: ["bugs"],
    }),

    getSingleBug: builder.query({
      query: (data) => `${mainUrl}/${data?.id}`,
    }),

    createBug: builder.mutation({
      query: (data) => ({
        url: mainUrl,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["bugs"]),
    }),

    deleteBug: builder.mutation({
      query: (data) => ({
        url: `${mainUrl}/${data?.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(bugFeedbackApi.util.invalidateTags(["bugs"]));
      },
    }),

    changeBugStatus: builder.mutation({
      query: (data) => ({
        url: `${mainUrl}/${data?.id}/update-status`,
        method: "POST",
        body: data,
      }),

      //   providesTags: ["changeStatus"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(bugFeedbackApi.util.invalidateTags(["bugs"]));
      },
    }),

    getFeedbacks: builder.query({
      query: (params) => ({
        url: feedbackUrl,
        params,
      }),
      providesTags: ["feedbacks"],
    }),

    createFeedback: builder.mutation({
      query: (data) => ({
        url: feedbackUrl,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["feedbacks"]),
    }),
  }),
});

export const {
  useGetBugsQuery,
  useGetSingleBugQuery,
  useCreateBugMutation,
  useChangeBugStatusMutation,
  useGetFeedbacksQuery,
  useCreateFeedbackMutation,
} = bugFeedbackApi;
