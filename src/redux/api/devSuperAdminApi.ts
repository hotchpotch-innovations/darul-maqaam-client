import { baseApi } from "./baseApi";

const devSuperAdminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllUsersQuery } = devSuperAdminApi;
