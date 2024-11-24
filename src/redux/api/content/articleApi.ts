import { contentTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const articleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createArticle: build.mutation({
      query: (data) => ({
        url: "/content/article/create",
        method: "POST",
        contentType: "multipart/form-data",
        data, // This will contain the data needed for password change
      }),
      invalidatesTags: [contentTags?.article],
    }),

    getAllArticles: build.query({
      query: (paramObj) => ({
        url: "/content/article/",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [contentTags?.article],
    }),

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

    deleteArticle: build.mutation({
      query: (id) => {
        return {
          url: `/content/article/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [contentTags?.article],
    }),
    changeArticleStatus: build.mutation({
      query: (id) => ({
        url: `/content/article/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags?.article],
    }),
  }),
});

export const {
  useCreateArticleMutation,
  useGetAllArticlesQuery,
  useDeleteArticleMutation,
  useChangeArticleStatusMutation,
} = articleApi;
