import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

const ClientManagePage = () => {
  const ClientTable = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/user/client-utils/ClientTable"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title={"client list"} />

      <ClientTable />
    </Box>
  );
};

export default ClientManagePage;
