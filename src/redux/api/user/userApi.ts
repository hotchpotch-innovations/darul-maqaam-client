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
  }),
  overrideExisting: false,
});

export const { useGetAllUsersQuery, useChangeUserStatusMutation } = userApi;
