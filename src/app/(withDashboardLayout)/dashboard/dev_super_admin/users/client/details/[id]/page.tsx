"use client";
import UserDetailsPage from "@/components/Dashboard/common/UserDetailsPage";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { useGetSingleClientQuery } from "@/redux/api/user/clientApi";
import { useParams } from "next/navigation";

const CLientDetails = () => {
  const { id }: { id: string } = useParams();

  const { data, isLoading } = useGetSingleClientQuery(id);

  return (
    <>
      <TitleDashboard title="Client Info" />
      <UserDetailsPage isLoading={isLoading} userData={data?.data} />
    </>
  );
};

export default CLientDetails;
