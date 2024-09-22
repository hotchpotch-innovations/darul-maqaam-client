import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const clientTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAccountTypes: build.query({
      query: () => ({
        url: "/system/client-type",
        method: "GET",
      }),
    }),

    getSingleClientTypes: build.query({
      query: (id) => ({
        url: `/system/client-type/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.client_type],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllAccountTypesQuery, useGetSingleClientTypesQuery } =
  clientTypeApi;
