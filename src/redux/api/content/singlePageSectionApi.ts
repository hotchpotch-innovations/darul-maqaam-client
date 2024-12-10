import { contentTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const singlePageSectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSPSection: build.mutation({
      query: (data) => ({
        url: "/content/page-section/create",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [contentTags?.single_section],
    }),

    // getAllPublicArticles: build.query({
    //   query: (paramObj) => ({
    //     url: "/content/page-section/public",
    //     method: "GET",
    //     params: paramObj,
    //   }),
    //   providesTags: [contentTags?.single_section],
    // }),

    getAllPrivateSPS: build.query({
      query: (paramObj) => ({
        url: "/content/page-section/private-page-sections",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [contentTags?.single_section],
    }),

    getSinglePageSection: build.query({
      query: (id: string) => ({
        url: `/content/page-section/${id}`,
        method: "GET",
      }),
      providesTags: [contentTags?.single_section],
    }),

    updateSPS: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        return {
          url: `/content/page-section/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.single_section],
    }),

    deleteSPS: build.mutation({
      query: (id) => {
        return {
          url: `/content/page-section/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [contentTags?.single_section],
    }),

    changeSPSStatus: build.mutation({
      query: (id) => ({
        url: `/content/page-section/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags?.single_section],
    }),

    singlePSAddFiles: build.mutation({
      query: (payload) => {
        const { id, data } = payload;
        return {
          url: `/content/page-section/add-files/${id}`,
          contentType: "multipart/form-data",
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [contentTags?.single_section],
    }),

    singlePSRemoveFile: build.mutation({
      query: ({ id, ...payload }) => ({
        url: `/content/page-section/remove-files/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [contentTags?.single_section],
    }),
  }),
});

export const {
  useCreateSPSectionMutation,
  useGetAllPrivateSPSQuery,
  useGetSinglePageSectionQuery,
  useUpdateSPSMutation,
  useDeleteSPSMutation,
  useChangeSPSStatusMutation,
  useSinglePSAddFilesMutation,
  useSinglePSRemoveFileMutation,
} = singlePageSectionApi;
