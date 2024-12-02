import { contentTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const teamApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTeamMember: build.mutation({
      query: (data) => ({
        url: "/content/team/create",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [contentTags?.team],
    }),

    getAllPublicTeamMember: build.query({
      query: (paramObj) => ({
        url: "/content/team/public",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [contentTags?.team],
    }),

    getAllPrivateTeamMember: build.query({
      query: (paramObj) => ({
        url: "/content/team/private",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [contentTags?.team],
    }),

    getSingleTeamMember: build.query({
      query: (id: string) => ({
        url: `/content/team/${id}`,
        method: "GET",
      }),
      providesTags: [contentTags?.team],
    }),

    updateTeam: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        return {
          url: `/content/team/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.team],
    }),

    deleteTeam: build.mutation({
      query: (id) => {
        return {
          url: `/content/team/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [contentTags?.team],
    }),

    changeTeamStatus: build.mutation({
      query: (id) => ({
        url: `/content/team/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags?.team],
    }),

    changePublishedTeamStatus: build.mutation({
      query: (id) => ({
        url: `/content/team/published/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags?.team],
    }),

    // changeOGImage: build.mutation({
    //   query: (data) => {
    //     const { id, ...payload } = data;
    //     return {
    //       url: `/content/team/change-image/${id}`,
    //       contentType: "multipart/form-data",
    //       method: "PATCH",
    //       data: payload,
    //     };
    //   },
    //   invalidatesTags: [contentTags?.team],
    // }),
  }),
});

export const {
  useCreateTeamMemberMutation,
  useGetAllPublicTeamMemberQuery,
  useGetAllPrivateTeamMemberQuery,
  useGetSingleTeamMemberQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useChangeTeamStatusMutation,
  useChangePublishedTeamStatusMutation,
  //   useChangeOGImageMutation,
} = teamApi;
