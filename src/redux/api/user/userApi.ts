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

    getMyProfile: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),

    changeUserStatus: build.mutation({
      query: (id) => ({
        url: `/user/status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user],
    }),

    updateMyProfile: build.mutation({
      query: (data) => ({
        url: `/user/update-my-profile`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.profile],
    }),

    changeProfileImage: build.mutation({
      query: (data) => ({
        url: `/user/change-profile-image`,
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.profile],
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
      invalidatesTags: [tagTypes?.user, tagTypes.employee],
    }),

    createClient: build.mutation({
      query: (data) => ({
        url: "/user/create-client",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes?.user, tagTypes.client],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useChangeProfileImageMutation,
  useChangeUserStatusMutation,
  useCreateSuperAdminMutation,
  useCreateAdminMutation,
  useCreateEmployeeMutation,
} = userApi;
