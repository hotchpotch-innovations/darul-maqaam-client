import Link from "next/link";
import React from "react";

type TProps = {
  role: string;
};

const DashboardButton = ({ role }: TProps) => {
  const user_role = role.toLowerCase();
  return (
    <li>
      <Link href={`/dashboard/${user_role}`}>Dashboard</Link>
    </li>
  );
};

export default DashboardButton;
