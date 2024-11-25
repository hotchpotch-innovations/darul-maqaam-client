import { contentTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const submenuApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSubmenu: build.query({
      query: (paramObj) => {
        return {
          url: `/content/submenu`,
          method: "GET",
          params: paramObj,
        };
      },
      providesTags: [contentTags?.submenu],
    }),

    createSubmenu: build.mutation({
      query: (data) => ({
        url: `/content/submenu/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [contentTags?.submenu],
    }),

    updateSubmenu: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        console.log({ id }, { payload });
        return {
          url: `/content/submenu/${id}`,
          method: "PATCH",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.submenu],
    }),

    deleteSubmenu: build.mutation({
      query: (id) => {
        return {
          url: `/content/submenu/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [contentTags.submenu],
    }),

    changeSubmenuStatus: build.mutation({
      query: (id) => ({
        url: `/content/submenu/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags.submenu],
    }),
  }),
});

export const {
  useGetAllSubmenuQuery,
  useCreateSubmenuMutation,
  useUpdateSubmenuMutation,
  useDeleteSubmenuMutation,
  useChangeSubmenuStatusMutation,
} = submenuApi;
