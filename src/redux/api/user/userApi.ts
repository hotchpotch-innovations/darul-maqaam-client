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

    getAllAdmin: build.query({
      query: (paramObj) => ({
        url: "/admin",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [tagTypes.admin],
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

    createAdmin: build.mutation({
      query: (data) => {
        return {
          url: "/user/create-admin",
          method: "POST",
          contentType: "multipart/form-data",
          data,
        };
      },
      invalidatesTags: [tagTypes?.user, tagTypes.admin],
    }),

    createEmployee: build.mutation({
      query: (data) => ({
        url: "/user/create-employee",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes?.user, tagTypes.admin],
    }),

    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
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
  useCreateAdminMutation,
  useGetAllAdminQuery,
  useDeleteAdminMutation,
  useCreateEmployeeMutation,
} = userApi;
