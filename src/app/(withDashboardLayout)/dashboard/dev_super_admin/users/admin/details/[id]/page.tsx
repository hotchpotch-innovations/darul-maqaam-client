"use client";

import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import UserDetailsPage from "@/components/Dashboard/dev_super_admin/common/UserDetailsPage";
import { useParams } from "next/navigation";

const UserDetails = () => {
  const { id }: { id: string } = useParams();
  return (
    <>
      <TitleDashboard title="User Info" />
      <UserDetailsPage userId={id} />
    </>
  );
};

export default UserDetails;
