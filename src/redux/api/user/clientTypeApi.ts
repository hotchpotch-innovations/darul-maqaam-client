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
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllAccountTypesQuery, useGetSingleClientTypesQuery } =
  clientTypeApi;
