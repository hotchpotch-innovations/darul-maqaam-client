"use client";
import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";

import { useParams } from "next/navigation";

const EmployeeDetails = () => {
  const { id }: { id: string } = useParams();

  return (
    <>
      <TitleDashboard title="Employee Info" />
    </>
  );
};

export default EmployeeDetails;
