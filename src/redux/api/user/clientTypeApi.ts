import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const clientTypeApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    getAllAccountTypes: build.query({
      query: () => ({
        url: "/system/client-type",
        method: "GET",
      }),
      providesTags: [tagTypes.client_type],
    }),

    getSingleClientTypes: build.query({
      query: (id: string) => ({
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
      query: (paramObj: any) => ({
        url: "/system/designation",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [tagTypes.designation],
    }),

    getAllcountrys: build.query({
      query: (paramObj: any) => ({
        url: "/system/address/country",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [tagTypes.designation],
    }),

    getAllDivision: build.query({
      query: (paramObj: any) => ({
        url: "/system/address/division",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [tagTypes.designation],
    }),

    getAllDistrict: build.query({
      query: (paramObj: any) => ({
        url: "/system/address/district",
        method: "GET",
        params: paramObj,
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
  useGetAllcountrysQuery,
  useGetAllDivisionQuery,
  useGetAllDistrictQuery,
} = clientTypeApi;
