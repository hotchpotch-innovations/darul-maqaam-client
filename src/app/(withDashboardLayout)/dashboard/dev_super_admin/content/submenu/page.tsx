import SubMenuTable from "@/components/dashboard/dev_super_admin/content/submenu/SubMenuTable";
import TitleDashboard from "@/components/dashboard/TitleDashboard";
import { Box } from "@mui/material";

const SubmenuPage = () => {
  return (
    <Box>
      <TitleDashboard title="Submenu Page" />
      <SubMenuTable />
    </Box>
  );
};

export default SubmenuPage;
