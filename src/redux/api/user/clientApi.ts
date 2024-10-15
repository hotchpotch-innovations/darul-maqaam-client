import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const clientApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllClient: build.query({
      query: (paramObj) => ({
        url: "/client",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [tagTypes.client],
    }),

    getSingleClient: build.query({
      query: (id) => {
        return {
          url: `/client/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.client],
    }),

    updateClient: build.mutation({
      query: (data) => {
        console.log(data);

        const { id, ...payload } = data;
        console.log({ payload });
        return {
          url: `/alient/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [tagTypes.client],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllClientQuery,
  useGetSingleClientQuery,
  useUpdateClientMutation,
} = clientApi;
