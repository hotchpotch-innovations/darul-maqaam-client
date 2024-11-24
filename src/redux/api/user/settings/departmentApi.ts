import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDepartment: build.query({
      query: () => ({
        url: "/system/department",
        method: "GET",
      }),
      providesTags: [tagTypes.department],
    }),
    createDepartment: build.mutation({
      query: (data) => ({
        url: "/system/department/create",
        method: "POST",
        data, // This will contain the data needed for password change
      }),
      invalidatesTags: [tagTypes.department],
    }),

    updateDepartment: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        return {
          url: `/system/department/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [tagTypes.department],
    }),

    deleteDepartment: build.mutation({
      query: (id) => {
        return {
          url: `/system/department/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.department],
    }),
  }),
});

export const {
  useGetAllDepartmentQuery,
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentApi;
