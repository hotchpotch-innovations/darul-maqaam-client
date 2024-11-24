"use client";

import UserDetailsPage from "@/components/Dashboard/common/UserDetailsPage";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { useGetSingleAdminQuery } from "@/redux/api/user/adminApi";

import { useParams } from "next/navigation";

const AdminUserDetails = () => {
  const { id }: { id: string } = useParams();

  const { data, isLoading } = useGetSingleAdminQuery(id);

  return (
    <>
      <TitleDashboard title="Admin Info" />

      <UserDetailsPage isLoading={isLoading} userData={data?.data} />
    </>
  );
};

export default AdminUserDetails;
