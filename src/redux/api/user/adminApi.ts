import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAdmin: build.query({
      query: (paramObj) => ({
        url: "/admin",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [tagTypes.admin],
    }),
    getSingleAdmin: build.query({
      query: (id) => {
        return {
          url: `/admin/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.admin],
    }),

    updateAdmin: build.mutation({
      query: (data) => {
        console.log(data);

        const { id, ...payload } = data;
        console.log({ payload });
        return {
          url: `/admin/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),
  }),
  //   overrideExisting: false,
});

export const {
  useGetAllAdminQuery,
  useGetSingleAdminQuery,
  useUpdateAdminMutation,
} = adminApi;
