import { TGenericErrorResponse, TResponseSuccessType } from "@/types";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseObject: TResponseSuccessType = {
      data: response?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const responseObject: TGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessage: error?.response?.data?.message,
    };
    // return Promise.reject(error);
    return responseObject;
  }
);

export { instance };

// Public :  postgresql://postgres:iPQBqHDPFASGLCCbEdTNPoOqQTVSGrrD@autorack.proxy.rlwy.net:35768/railway
// local :   postgresql://postgres:iPQBqHDPFASGLCCbEdTNPoOqQTVSGrrD@postgres.railway.internal:5432/railway
