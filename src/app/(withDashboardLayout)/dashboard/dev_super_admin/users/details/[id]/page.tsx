"use client";

import UserDetailsPage from "@/components/Dashboard/dev_super_admin/common/UserDetailsPage";
import { useParams } from "next/navigation";

const UserDetails = () => {
  const { id }: { id: string } = useParams();
  return <UserDetailsPage userId={id} />;
};

export default UserDetails;
