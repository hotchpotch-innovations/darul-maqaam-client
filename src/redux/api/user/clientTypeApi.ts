import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const clientTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAccountTypes: build.query({
      query: () => ({
        url: "/system/client-type",
        method: "GET",
      }),
      providesTags: [tagTypes.client_type],
    }),

    getSingleClientTypes: build.query({
      query: (id) => ({
        url: `/system/client-type/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.client_type],
    }),

    getAllDepartment: build.query({
      query: () => ({
        url: "/system/department",
        method: "GET",
      }),
      providesTags: [tagTypes.department],
    }),

    getAllDesignation: build.query({
      query: () => ({
        url: "/system/designation",
        method: "GET",
      }),
      providesTags: [tagTypes.designation],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllAccountTypesQuery,
  useGetSingleClientTypesQuery,
  useGetAllDepartmentQuery,
  useGetAllDesignationQuery,
} = clientTypeApi;
