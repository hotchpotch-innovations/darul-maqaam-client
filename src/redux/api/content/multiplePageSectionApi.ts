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
    // getAllCategories: build.query({
    //   query: (paramObj) => ({
    //     url: "/content/config/common-category",
    //     method: "GET",
    //     params: paramObj,
    //   }),
    //   providesTags: [contentTags?.category],
    // }),

    // updateCategory: build.mutation({
    //   query: (data) => {
    //     const { id, ...payload } = data;
    //     return {
    //       url: `/content/config/common-category/${id}`,
    //       method: "PATCH",
    //       contentType: "application/json",
    //       data: payload,
    //     };
    //   },
    //   invalidatesTags: [contentTags?.category],
    // }),

    // deleteCategory: build.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/content/config/common-category/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: [contentTags?.category],
    // }),
    // changeCategoryStatus: build.mutation({
    //   query: (id) => ({
    //     url: `/content/config/common-category/${id}`,
    //     method: "PATCH",
    //   }),
    //   invalidatesTags: [contentTags?.category],
    // }),
  }),
});

export const { useCreateMultipleSectionMutation } = multiplePageSectionApi;
