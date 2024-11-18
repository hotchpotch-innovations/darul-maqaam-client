import { useEffect, useState } from "react";
import { decodedToken } from "@/utils/jwt";
import Cookies from "js-cookie"; // Use default import for 'js-cookie'
import { JwtPayload } from "jwt-decode"; // Fixed the typo in "local-storage"
import { authkey } from "@/constants/authkey";
import { getFromLocalStorage } from "@/utils/local-starage";
import { useRouter } from "next/navigation";

// Define a type for the user information
interface UserInfo extends JwtPayload {
  role?: string;
}

const useUserInfo = (): UserInfo | null => {
  const router = useRouter;
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = () => {
      // Try to get the access token from localStorage first
      const authToken = getFromLocalStorage(authkey);

      // If no token found in localStorage, try from cookies
      const authTokenFromCookie = Cookies.get("accessToken"); // Use the correct 'Cookies' from js-cookie

      if (authToken === authTokenFromCookie) {
        const decodedData = decodedToken(authToken) as UserInfo;
        const userInfo: UserInfo = {
          ...decodedData,
          role: decodedData.role?.toLowerCase() || "",
        };
        setUserInfo(userInfo);
      } else {
        setUserInfo(null);
        Cookies.remove(authkey);
        localStorage.removeItem(authkey);
      }
    };

    fetchUserInfo();
  }, []);

  return userInfo;
};

export default useUserInfo;
