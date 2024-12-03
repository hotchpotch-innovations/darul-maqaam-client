import { contentTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPrivateFaq: build.query({
      query: (paramObj) => {
        return {
          url: `/content/faq/private`,
          method: "GET",
          params: paramObj,
        };
      },
      providesTags: [contentTags?.faq],
    }),

    getAllPublicFaq: build.query({
      query: (paramObj) => {
        return {
          url: `/content/faq/public`,
          method: "GET",
          params: paramObj,
        };
      },
      providesTags: [contentTags?.faq],
    }),

    createFaq: build.mutation({
      query: (data) => ({
        url: `/content/faq/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [contentTags?.faq],
    }),

    updateFaq: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        console.log({ id }, { payload });
        return {
          url: `/content/faq/${id}`,
          method: "PATCH",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.faq],
    }),

    deleteFaq: build.mutation({
      query: (id) => {
        return {
          url: `/content/faq/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [contentTags.faq],
    }),

    changeFaqStatus: build.mutation({
      query: (id) => ({
        url: `/content/faq/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags.faq],
    }),
  }),
});

export const {
  useGetAllPrivateFaqQuery,
  useGetAllPublicFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useChangeFaqStatusMutation,
} = faqApi;
