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

    getSingleArticle: build.query({
      query: (id: string) => ({
        url: `/content/article/${id}`,
        method: "GET",
      }),
      providesTags: [contentTags?.article],
    }),

    updateArticle: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        return {
          url: `/content/article/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.article],
    }),

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
    changePublishedArticleStatus: build.mutation({
      query: (id) => ({
        url: `/content/article/published/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags?.article],
    }),
  }),
});

export const {
  useCreateArticleMutation,
  useGetAllArticlesQuery,
  useGetSingleArticleQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useChangeArticleStatusMutation,
  useChangePublishedArticleStatusMutation,
} = articleApi;
