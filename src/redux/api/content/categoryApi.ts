import { contentTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (data) => ({
        url: "/content/config/common-category/create",
        method: "POST",
        data, // This will contain the data needed for password change
      }),
      invalidatesTags: [contentTags?.category],
    }),
    getAllCategories: build.query({
      query: (paramObj) => ({
        url: "/content/config/common-category",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [contentTags?.category],
    }),

    updateCategory: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        return {
          url: `/content/config/common-category/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.category],
    }),

    deleteCategory: build.mutation({
      query: (id) => {
        return {
          url: `/content/config/common-category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [contentTags?.category],
    }),
    changeCategoryStatus: build.mutation({
      query: (id) => ({
        url: `/content/config/common-category/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags?.category],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useChangeCategoryStatusMutation,
} = departmentApi;
