import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

const divisionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDivision: build.query({
      query: () => {
        return {
          url: `/system/address/division`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.division],
    }),

    createDivision: build.mutation({
      query: (data) => {
        return {
          url: "/system/address/division/create",
          method: "POST",
          data,
        };
      },

      invalidatesTags: [tagTypes.division],
    }),

    updateDivision: build.mutation({
      query: (data) => {
        console.log(data);

        const { id, ...payload } = data;
        console.log({ payload });
        return {
          url: `/system/address/division/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [tagTypes.division],
    }),

    deleteDivision: build.mutation({
      query: (id) => {
        return {
          url: `/system/address/division/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.division],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllDivisionQuery,
  useCreateDivisionMutation,
  useDeleteDivisionMutation,
  useUpdateDivisionMutation,
} = divisionApi;
