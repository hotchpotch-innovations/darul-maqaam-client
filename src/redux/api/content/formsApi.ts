import { contentTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPrivateForms: build.query({
      query: (paramObj) => {
        return {
          url: `/content/ft/private`,
          method: "GET",
          params: paramObj,
        };
      },
      providesTags: [contentTags?.forms],
    }),

    getAllPublicForms: build.query({
      query: (paramObj) => {
        return {
          url: `/content/ft/public`,
          method: "GET",
          params: paramObj,
        };
      },
      providesTags: [contentTags?.forms],
    }),

    getSingleForm: build.query({
      query: (id) => {
        return {
          url: `/content/ft/${id}`,
          method: "GET",
        };
      },
      providesTags: [contentTags?.forms],
    }),

    createForms: build.mutation({
      query: (data) => ({
        url: `/content/ft/create`,
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [contentTags?.forms],
    }),

    updateForms: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        console.log({ id }, { payload });
        return {
          url: `/content/ft/${id}`,
          method: "PATCH",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.forms],
    }),

    deleteForms: build.mutation({
      query: (id) => {
        return {
          url: `/content/ft/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [contentTags?.forms],
    }),

    changeFormsStatus: build.mutation({
      query: (id) => ({
        url: `/content/ft/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags?.forms],
    }),
  }),
});

export const {
  useGetAllPrivateFormsQuery,
  useGetAllPublicFormsQuery,
  useGetSingleFormQuery,
  useCreateFormsMutation,
  useUpdateFormsMutation,
  useDeleteFormsMutation,
  useChangeFormsStatusMutation,
} = faqApi;
