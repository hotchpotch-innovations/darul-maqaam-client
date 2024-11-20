"use client";
import UserProfile from "@/components/Dashboard/common/UserProfile";
import { useGetMyProfileQuery } from "@/redux/api/user/userApi";
import { useParams } from "next/navigation";
import React from "react";

const SuperAdminProfile = () => {
  const { data, isLoading } = useGetMyProfileQuery("");
  console.log(data);
  return (
    <>
      <UserProfile />
    </>
  );
};

export default SuperAdminProfile;
