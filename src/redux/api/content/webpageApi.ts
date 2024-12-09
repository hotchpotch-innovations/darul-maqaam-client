import { contentTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const webpageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createWebpage: build.mutation({
      query: (data) => ({
        url: "/content/webpage/create",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [contentTags?.webpage],
    }),

    getAllPublicWebpage: build.query({
      query: (paramObj) => ({
        url: "/content/webpage/public",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [contentTags?.webpage],
    }),

    getAllPrivateWebpage: build.query({
      query: (paramObj) => ({
        url: "/content/webpage/private",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [contentTags?.webpage],
    }),

    getPublicNavbar: build.query({
      query: () => ({
        url: "/content/webpage/navbar/public",
        method: "GET",
      }),
      providesTags: [contentTags?.webpage],
    }),

    getSingleWebpage: build.query({
      query: (slug: string) => ({
        url: `/content/webpage/${slug}`,
        method: "GET",
      }),
      providesTags: [contentTags?.webpage],
    }),

    updateWebpage: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        return {
          url: `/content/webpage/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.webpage],
    }),

    deleteWebpage: build.mutation({
      query: (id) => {
        return {
          url: `/content/webpage/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [contentTags?.webpage],
    }),

    changeWebpageStatus: build.mutation({
      query: (id) => ({
        url: `/content/webpage/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags?.webpage],
    }),

    changePublishedWebpageStatus: build.mutation({
      query: (id) => ({
        url: `/content/webpage/published/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags?.webpage],
    }),

    changeWebpageOGImage: build.mutation({
      query: (data) => {
        const { id, payload } = data;
        return {
          url: `/content/webpage/change-image/${id}`,
          contentType: "multipart/form-data",
          method: "PATCH",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.webpage],
    }),
  }),
});

export const {
  useCreateWebpageMutation,
  useGetAllPublicWebpageQuery,
  useGetAllPrivateWebpageQuery,
  useGetPublicNavbarQuery,
  useGetSingleWebpageQuery,
  useUpdateWebpageMutation,
  useDeleteWebpageMutation,
  useChangeWebpageStatusMutation,
  useChangePublishedWebpageStatusMutation,
  useChangeWebpageOGImageMutation,
} = webpageApi;
