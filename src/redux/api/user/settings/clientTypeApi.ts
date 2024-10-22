import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

const clientTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllClientType: build.query({
      query: (paramObj) => ({
        url: "/system/client-type",
        method: "GET",
        params: paramObj,
      }),
      providesTags: [tagTypes.client_type],
    }),

    createClientType: build.mutation({
      query: (data) => ({
        url: "/system/client-type/create",
        method: "POST",
        data, // This will contain the data needed for password change
      }),
      invalidatesTags: [tagTypes.client_type],
    }),

    updateClientType: build.mutation({
      query: (data) => {
        const { id, ...payload } = data;
        return {
          url: `/system/client-type/${id}`,
          method: "PATCH",
          contentType: "application/json",
          data: payload,
        };
      },
      invalidatesTags: [tagTypes.client_type],
    }),

    deleteClientType: build.mutation({
      query: (id) => {
        return {
          url: `/system/client-type/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.client_type],
    }),
  }),
});

export const {
  useGetAllClientTypeQuery,
  useCreateClientTypeMutation,
  useDeleteClientTypeMutation,
  useUpdateClientTypeMutation,
} = clientTypeApi;
