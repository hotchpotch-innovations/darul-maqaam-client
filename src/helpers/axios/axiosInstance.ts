import { authkey, resetKey } from "@/constants/authkey";
import { setAccessTokenCookie } from "@/services/actions/setAccessTokenCookie";
import { getNewAccessToken } from "@/services/auth.services";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-starage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const resetToken = getFromLocalStorage(resetKey);

    const accessToken = getFromLocalStorage(authkey);
    if (!!resetToken) {
      config.headers.Authorization = resetToken;
    } else if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const responseObject: ResponseSuccessType = {
      data: response?.data,
    };
    return responseObject;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error);
    const config = error.config;

    if (error?.response?.status === 500 && !config.sent) {
      config["sent"] = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage(authkey, accessToken);
      setAccessTokenCookie(accessToken);
      // setAccessToken(accessToken);
      return instance(config);
    } else {
      const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessages: error?.response?.data?.message,
      };
      // return Promise.reject(error);
      return responseObject;
    }
  }
);

export { instance };
