import { contentTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPrivateCommonCategory: build.query({
      query: (paramObj) => {
        return {
          url: `/content/config/common-category/private`,
          method: "GET",
          params: paramObj,
        };
      },
      providesTags: [contentTags?.common_category],
    }),

    getAllPublicCommonCategory: build.query({
      query: (paramObj) => {
        return {
          url: `/content/config/common-category/public`,
          method: "GET",
          params: paramObj,
        };
      },
      providesTags: [contentTags?.common_category],
    }),

    createCommonCategory: build.mutation({
      query: (data) => ({
        url: `/content/config/common-category/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [contentTags?.common_category],
    }),

    updateCommonCategory: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        console.log({ id }, { payload });
        return {
          url: `/content/config/common-category/${id}`,
          method: "PATCH",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.common_category],
    }),

    deleteCommonCategory: build.mutation({
      query: (id) => {
        return {
          url: `/content/config/common-category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [contentTags.common_category],
    }),

    changeCommonCategoryStatus: build.mutation({
      query: (id) => ({
        url: `/content/config/common-category/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags.common_category],
    }),
  }),
});

export const {
  useGetAllPrivateCommonCategoryQuery,
  useGetAllPublicCommonCategoryQuery,
  useCreateCommonCategoryMutation,
  useUpdateCommonCategoryMutation,
  useDeleteCommonCategoryMutation,
  useChangeCommonCategoryStatusMutation,
} = categoryApi;
