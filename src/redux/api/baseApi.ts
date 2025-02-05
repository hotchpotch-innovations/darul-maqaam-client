import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery ";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_BACKEND_API_URL ||
      "http://api.darulmaqaamfoundation.org/api/v1",
    // baseUrl: "http://localhost:5000/api/v1",
    // baseUrl: "http://api.darulmaqaamfoundation.org/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
