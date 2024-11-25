"use client";
import dynamic from "next/dynamic";

const DevSuperAdminProfilePage = () => {
  const PrivateUserProfile = dynamic(
    () => import("@/components/Dashboard/common/profile/PrivateUserProfile"),
    { ssr: false }
  );
  return (
    <>
      <PrivateUserProfile />
    </>
  );
};

export default DevSuperAdminProfilePage;
