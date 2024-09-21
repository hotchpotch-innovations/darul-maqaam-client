import { baseApi } from "./baseApi";

const devSuperAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: "/system/client-type",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllUsersQuery } = devSuperAdminApi;
