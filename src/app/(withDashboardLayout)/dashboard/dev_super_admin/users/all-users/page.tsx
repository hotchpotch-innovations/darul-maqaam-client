import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const AllUserPage = () => {
  const AllUserTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/user/all-user-utils/AllUserTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="All Users List" />
      <AllUserTable />
    </Box>
  );
};

export default AllUserPage;
