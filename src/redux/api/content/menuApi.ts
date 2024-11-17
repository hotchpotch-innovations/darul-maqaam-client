import { contentTags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const menuApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMenu: build.query({
      query: (paramObj) => {
        return {
          url: `/content/menu`,
          method: "GET",
          params: paramObj,
        };
      },
      providesTags: [contentTags?.menu],
    }),

    createMenu: build.mutation({
      query: (data) => ({
        url: `/content/menu/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [contentTags?.menu],
    }),

    updateMenu: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        console.log({ id }, { payload });
        return {
          url: `/content/menu/${id}`,
          method: "PATCH",
          data: payload,
        };
      },
      invalidatesTags: [contentTags?.menu],
    }),

    deleteMenu: build.mutation({
      query: (id) => {
        return {
          url: `/content/menu/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [contentTags.menu],
    }),

    changeMenuStatus: build.mutation({
      query: (id) => ({
        url: `/content/menu/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [contentTags.menu],
    }),
  }),
});

export const {
  useGetAllMenuQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
  useChangeMenuStatusMutation,
} = menuApi;
