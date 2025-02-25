import { contentTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const multiplePageSectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createMultipleSection: build.mutation({
      query: (data) => ({
        url: "/content/multiple-page-section/create",
        method: "POST",
        contentType: "multipart/form-data",
        data, // This will contain the data needed for password change
      }),
      invalidatesTags: [contentTags?.multiple_section],
    }),

    getAllPrivateMPS: build.query({
      query: (paramObj) => ({
        url: "/content/multiple-page-section/private",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [contentTags?.multiple_section],
    }),

    getAllPublicMPS: build.query({
      query: (paramObj) => ({
        url: "/content/multiple-page-section/public",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [contentTags?.multiple_section],
    }),

    getSingleMPS: build.query({
      query: (id: string) => ({
        url: `/content/multiple-page-section/${id}`,
        method: "GET",
        // params: paramObj,
      }),
      providesTags: [contentTags?.multiple_section],
    }),

    updateMPSItem: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        return {
          url: `/content/multiple-page-section/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.multiple_section],
    }),

    deleteMPSItem: build.mutation({
      query: (id) => {
        return {
          url: `/content/multiple-page-section/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [contentTags?.multiple_section],
    }),
    changeMPSItemStatus: build.mutation({
      query: (id) => ({
        url: `/content/multiple-page-section/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags?.multiple_section],
    }),
    changePublishedMPSItemStatus: build.mutation({
      query: (id) => ({
        url: `/content/multiple-page-section/published/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags?.multiple_section],
    }),
    changeMPSCoverImage: build.mutation({
      query: (data) => {
        const { id, payload } = data;
        return {
          url: `/content/multiple-page-section/change-cover-image/${id}`,
          contentType: "multipart/form-data",
          method: "PATCH",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.multiple_section],
    }),

    multiplePSAddFiles: build.mutation({
      query: (payload) => {
        const { id, data } = payload;
        return {
          url: `/content/multiple-page-section/add-files/${id}`,
          contentType: "multipart/form-data",
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [contentTags?.multiple_section],
    }),

    multiplePSRemoveFile: build.mutation({
      query: ({ id, ...payload }) => ({
        url: `/content/multiple-page-section/remove-files/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [contentTags?.multiple_section],
    }),
  }),
});

export const {
  useCreateMultipleSectionMutation,
  useGetAllPrivateMPSQuery,
  useGetAllPublicMPSQuery,
  useGetSingleMPSQuery,
  useDeleteMPSItemMutation,
  useChangeMPSItemStatusMutation,
  useChangePublishedMPSItemStatusMutation,
  useUpdateMPSItemMutation,
  useChangeMPSCoverImageMutation,
  useMultiplePSAddFilesMutation,
  useMultiplePSRemoveFileMutation,
} = multiplePageSectionApi;
