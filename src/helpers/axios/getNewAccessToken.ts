// Assuming you have a refresh key constant
import { getFromLocalStorage } from "@/utils/local-starage";
import { instance } from "./axiosInstance";

export const getNewAccessToken = async () => {
  try {
    const refreshToken = getFromLocalStorage("refreshToken"); // Get refresh token from local storage
    const response = await instance.post("/auth/refresh-token", {
      token: refreshToken,
    });
    return response;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error; // Rethrow so it can be handled in the interceptor
  }
};
