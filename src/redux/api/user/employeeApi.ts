import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import UpdateEmployee from "@/app/(withDashboardLayout)/dashboard/dev_super_admin/users/employee/manage-employee/update/[id]/page";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllEmployee: build.query({
      query: (paramObj) => ({
        url: "/employee",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [tagTypes.employee],
    }),

    getSingleEmployee: build.query({
      query: (id) => {
        return {
          url: `/employee/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.employee],
    }),

    UpdateEmployee: build.mutation({
      query: (data) => {
        console.log(data);

        const { id, ...payload } = data;
        console.log({ payload });
        return {
          url: `/employee/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [tagTypes.employee],
    }),

    deleteEmployee: build.mutation({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.employee],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllEmployeeQuery,
  useGetSingleEmployeeQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
