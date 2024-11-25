import dynamic from "next/dynamic";

const EmployeeProfilePage = () => {
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

export default EmployeeProfilePage;
