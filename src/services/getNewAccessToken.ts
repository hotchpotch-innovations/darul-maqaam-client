import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";

export const getNewAccessToken = async () => {
  try {
    const response = await axiosInstance({
      url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null; // Return null or handle error as needed
  }
};
