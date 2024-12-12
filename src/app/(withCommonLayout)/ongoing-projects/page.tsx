import Drawer from "@/components/UI/Drawer";
import Title from "@/components/UI/Title";
import { Stack } from "@mui/material";
import { aboutData } from "../../../../public/data/AboutData";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";

// Dynamic metadata generation function
export async function generateMetadata() {
  const page_slug = webpageSlugs?.ongoing_projects;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    slug: page_slug,
  });

  return result;
}

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
