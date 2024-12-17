import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const SubmenuPage = () => {
  const SubMenuTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/super_admin/contents/submenus/SubMenuTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Submenu List" />
      <SubMenuTable />
    </Box>
  );
};

export default SubmenuPage;
