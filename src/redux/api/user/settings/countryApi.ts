import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

const countryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCountry: build.query({
      query: () => {
        return {
          url: `/system/address/country`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.country],
    }),

    createCountry: build.mutation({
      query: (data) => ({
        url: "/system/address/country/create",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.country],
    }),

    // updateAdmin: build.mutation({
    //   query: (data) => {
    //     console.log(data);

    //     const { id, ...payload } = data;
    //     console.log({ payload });
    //     return {
    //       url: `/admin/${id}`,
    //       method: "PATCH",
    //       contentType: "application/json",
    //       data: payload,
    //     };
    //   },
    //   invalidatesTags: [tagTypes.admin],
    // }),
  }),
  //   overrideExisting: false,
});

export const { useGetAllCountryQuery, useCreateCountryMutation } = countryApi;
