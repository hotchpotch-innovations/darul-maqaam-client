import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery ";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://countriesnow.space/api/v0.1/countries/population",
  }),
  endpoints: () => ({}),
});
