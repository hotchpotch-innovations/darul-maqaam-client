import dynamic from "next/dynamic";

const AdminProfilePage = () => {
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

export default AdminProfilePage;
