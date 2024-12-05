import { organizationTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const branchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBranch: build.mutation({
      query: (data) => ({
        url: "/system/branch/create",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [organizationTags?.branch],
    }),

    getAllPublicBranch: build.query({
      query: (paramObj) => ({
        url: "/system/branch/public",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [organizationTags?.branch],
    }),

    getAllPrivateBranch: build.query({
      query: (paramObj) => ({
        url: "/system/branch/private",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [organizationTags?.branch],
    }),

    getSingleBranch: build.query({
      query: (id: string) => ({
        url: `/system/branch/${id}`,
        method: "GET",
      }),
      providesTags: [organizationTags?.branch],
    }),

    updateBranch: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        return {
          url: `/system/branch/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [organizationTags?.branch],
    }),

    deleteBranch: build.mutation({
      query: (id) => {
        return {
          url: `/system/branch/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [organizationTags?.branch],
    }),

    changeBranchStatus: build.mutation({
      query: (id) => ({
        url: `/system/branch/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [organizationTags?.branch],
    }),
  }),
});

export const {
  useCreateBranchMutation,
  useGetAllPrivateBranchQuery,
  useGetAllPublicBranchQuery,
  useGetSingleBranchQuery,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
  useChangeBranchStatusMutation,
} = branchApi;
