import dynamic from "next/dynamic";

const ClientProfilePage = () => {
  const PublicUserProfile = dynamic(
    () => import("@/components/Dashboard/common/profile/PublicUserProfile"),
    { ssr: false }
  );
  return (
    <div>
      <PublicUserProfile />
    </div>
  );
};

export default ClientProfilePage;
