// Import the baseApi from your API slice setup
import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

// Define the changePassword endpoint
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation({
      query: (passwordData) => ({
        url: "/auth/change-password",
        method: "POST",
        data: passwordData, // This will contain the data needed for password change
      }),
      invalidatesTags: [tagTypes.user],
    }),

    forgotPassword: build.mutation({
      query: (forgotData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: forgotData, // This will contain the data needed for password change
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
  overrideExisting: false,
});

export const { useChangePasswordMutation, useForgotPasswordMutation } = authApi;
