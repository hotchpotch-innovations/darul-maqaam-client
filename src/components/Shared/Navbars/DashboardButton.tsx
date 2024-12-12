import Link from "next/link";
import React from "react";

type TProps = {
  role: string;
};

const DashboardButton = ({ role }: TProps) => {
  const user_role = role.toLowerCase();
  return (
    <li className="hover:text-green-500">
      <Link href={`/dashboard/${user_role}`}>Dashboard</Link>
    </li>
  );
};

export default DashboardButton;
