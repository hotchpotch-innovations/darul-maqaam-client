"use client";
import { logOutUser } from "@/services/actions/logoutUser";
import { getUserInfoFromLocalStorage } from "@/services/auth.Services.Loacl";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = getUserInfoFromLocalStorage();

  const handleLoutOut = () => {
    logOutUser();
    router.push("/");
  };
  return (
    <>
      {!!userInfo ? (
        <li
          onClick={handleLoutOut}
          style={{
            color: "red",
            cursor: "pointer",
          }}
        >
          Logout
        </li>
      ) : (
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
      )}
    </>
  );
};

export default AuthButton;
