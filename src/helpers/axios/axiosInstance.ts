import { authkey } from "@/constants/authkey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-starage";
import axios from "axios";
import { getNewAccessToken } from "./getNewAccessToken";
import setAccessTokenCookie from "@/services/actions/setAccessTokenCookie";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(authkey);
    if (!!accessToken) {
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
    const responseObject: ResponseSuccessType = {
      data: response?.data,
    };
    return responseObject;
  },
  async function (error) {
    const config = error.config;

    if (error?.response?.status === 401 && !config.sent) {
      config["sent"] = true;
      const response = await getNewAccessToken();
      const accessToken = response?.data?.data?.accessToken;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage(authkey, accessToken);
      setAccessTokenCookie(accessToken);

      return instance(config);
    } else {
      const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message:
          error?.response?.data?.message ||
          "Something went wrong From Axios!!! ",
        errorMessages: error?.response?.data?.message,
      };
      return responseObject;
    }
  }
);

export { instance };
