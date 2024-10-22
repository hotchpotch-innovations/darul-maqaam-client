import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

const districtApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDistrict: build.query({
      query: (paramObj) => {
        return {
          url: `/system/address/district`,
          method: "GET",
          params: paramObj,
        };
      },
      providesTags: [tagTypes.district],
    }),

    createDistrict: build.mutation({
      query: (data) => ({
        url: "/system/address/district/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.district],
    }),

    updateDistrict: build.mutation({
      query: (data) => {
        console.log(data);

        const { id, ...payload } = data;
        console.log({ payload });
        return {
          url: `/system/address/district/${id}`,
          method: "PATCH",
          data: payload,
        };
      },
      invalidatesTags: [tagTypes.district],
    }),

    deleteDistrict: build.mutation({
      query: (id) => {
        return {
          url: `/system/address/district/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.district],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllDistrictQuery,
  useCreateDistrictMutation,
  useDeleteDistrictMutation,
  useUpdateDistrictMutation,
} = districtApi;
