import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { aboutData } from "../../../../public/data/AboutData";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";

// Dynamic metadata generation function
export async function generateMetadata() {
  const page_slug = webpageSlugs?.about;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    slug: page_slug,
  });

  return result;
}

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
