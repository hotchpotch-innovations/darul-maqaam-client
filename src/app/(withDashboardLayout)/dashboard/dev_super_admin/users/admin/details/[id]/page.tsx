"use client";

import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import AdminUserDetailsPage from "@/components/Dashboard/dev_super_admin/common/AdminUserDetailsPage";

import { useParams } from "next/navigation";

const AdminUserDetails = () => {
  const { id }: { id: string } = useParams();
  return (
    <>
      <TitleDashboard title="User Info" />
      <AdminUserDetailsPage userId={id} />
    </>
  );
};

export default AdminUserDetails;
