"use client";
import UserDetailsPage from "@/components/Dashboard/common/UserDetailsPage";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { useGetSingleEmployeeQuery } from "@/redux/api/user/employeeApi";
import { useParams } from "next/navigation";

const EmployeeDetails = () => {
  const { id }: { id: string } = useParams();

  const { data, isLoading } = useGetSingleEmployeeQuery(id);

  return (
    <>
      <TitleDashboard title="Employee Info" />
      <UserDetailsPage isLoading={isLoading} userData={data?.data} />
    </>
  );
};

export default EmployeeDetails;
