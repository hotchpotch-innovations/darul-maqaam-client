import Drawer from "@/components/UI/Drawer";
import Title from "@/components/UI/Title";
import { Box } from "@mui/material";
import { aboutData } from "../../../../public/data/AboutData";

const ProjectsPage = () => {
  return (
    <>
      <Title title="projects" />
      <Box bgcolor={"secondary.main"}>
        <Drawer firstMenu="Introduction" drawerData={aboutData} />
      </Box>
    </>
  );
};

export default ProjectsPage;
