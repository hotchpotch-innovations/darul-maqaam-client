import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { aboutData } from "../../../../public/data/AboutData";

const AboutPage = () => {
  const Title = dynamic(() => import("@/components/UI/Title"));
  const Drawer = dynamic(() => import("@/components/UI/Drawer"));
  return (
    <div>
      <Title title="about" />
      <Stack bgcolor={"secondary.main"}>
        <Drawer firstMenu="Introduction" drawerData={aboutData} />
      </Stack>
    </div>
  );
};

export default AboutPage;
