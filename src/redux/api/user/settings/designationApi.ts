import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

const designationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDesignation: build.mutation({
      query: (data) => ({
        url: "/system/designation/create",
        method: "POST",
        data, // This will contain the data needed for password change
      }),
      invalidatesTags: [tagTypes.designation],
    }),

    updateDesignation: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        return {
          url: `/system/designation/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [tagTypes.designation],
    }),

    deleteDesignation: build.mutation({
      query: (id) => {
        return {
          url: `/system/designation/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.designation],
    }),
  }),
});

export const {
  useCreateDesignationMutation,
  useDeleteDesignationMutation,
  useUpdateDesignationMutation,
} = designationApi;
