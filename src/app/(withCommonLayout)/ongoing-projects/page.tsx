import Drawer from "@/components/UI/Drawer";
import Title from "@/components/UI/Title";
import { Stack } from "@mui/material";
import { aboutData } from "../../../../public/data/AboutData";

const OngoingPage = () => {
  return (
    <>
      <Title title="ongoing projects" />
      <Stack bgcolor={"secondary.main"}>
        <Drawer firstMenu="Introduction" drawerData={aboutData} />
      </Stack>
    </>
  );
};

export default OngoingPage;
