import { organizationTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const organizationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrganization: build.mutation({
      query: (data) => ({
        url: "/system/business/create",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [organizationTags?.organization],
    }),

    getFirstOrganization: build.query({
      query: (paramObj) => ({
        url: "/system/business",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [organizationTags?.organization],
    }),

    updateOrganization: build.mutation({
      query: (data) => {
        return {
          url: `/system/business/update`,
          method: "PATCH",
          contentType: "application/json",
          data,
        };
      },
      invalidatesTags: [organizationTags?.organization],
    }),

    changeOrganizationLogo: build.mutation({
      query: (data) => {
        return {
          url: `/system/business/change-logo`,
          contentType: "multipart/form-data",
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [organizationTags?.organization],
    }),
  }),
});

export const {
  useCreateOrganizationMutation,
  useGetFirstOrganizationQuery,
  useUpdateOrganizationMutation,
  useChangeOrganizationLogoMutation,
} = organizationApi;
