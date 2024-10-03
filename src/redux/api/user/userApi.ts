import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (paramObj) => ({
        url: "/user",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [tagTypes.user],
    }),

    changeUserStatus: build.mutation({
      query: (id) => ({
        url: `/user/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user],
    }),

    createSuperAdmin: build.mutation({
      query: (data) => ({
        url: "/user/create-super-admin",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes?.user, tagTypes.admin],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useChangeUserStatusMutation,
  useCreateSuperAdminMutation,
} = userApi;
