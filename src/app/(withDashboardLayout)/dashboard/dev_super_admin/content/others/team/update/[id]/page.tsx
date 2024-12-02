import TitleDashboard from "@/components/Dashboard/dashboard-titles/TitleDashboard";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

type TProps = {
  params: Record<string, any>;
};

const UpdateTeamPage = ({ params }: TProps) => {
  const id = params?.id;

  const UpdateTeamMemberForm = dynamic(
    () =>
      import(
        "@/components/Dashboard/dev_super_admin/contents/others/team_utils/UpdateTeamMemberForm"
      ),
    {
      ssr: false,
    }
  );
  return (
    <Box>
      <TitleDashboard title="Update Member" />
      <UpdateTeamMemberForm id={id} />
    </Box>
  );
};

export default UpdateTeamPage;
