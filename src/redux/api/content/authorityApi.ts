import { contentTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const authorityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPrivateAuthority: build.query({
      query: (paramObj) => {
        return {
          url: `/content/config/ft-authority/private`,
          method: "GET",
          params: paramObj,
        };
      },
      providesTags: [contentTags?.common_authority],
    }),

    getAllPublicAuthority: build.query({
      query: (paramObj) => {
        return {
          url: `/content/config/ft-authority/public`,
          method: "GET",
          params: paramObj,
        };
      },
      providesTags: [contentTags?.common_authority],
    }),

    createAuthority: build.mutation({
      query: (data) => ({
        url: `/content/config/ft-authority/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [contentTags?.common_authority],
    }),

    updateAuthority: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        console.log({ id }, { payload });
        return {
          url: `/content/config/ft-authority/${id}`,
          method: "PATCH",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.common_authority],
    }),

    deleteAuthority: build.mutation({
      query: (id) => {
        return {
          url: `/content/config/ft-authority/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [contentTags?.common_authority],
    }),

    changeAuthorityStatus: build.mutation({
      query: (id) => ({
        url: `/content/config/ft-authority/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags?.common_authority],
    }),
  }),
});

export const {
  useGetAllPrivateAuthorityQuery,
  useGetAllPublicAuthorityQuery,
  useCreateAuthorityMutation,
  useUpdateAuthorityMutation,
  useDeleteAuthorityMutation,
  useChangeAuthorityStatusMutation,
} = authorityApi;
