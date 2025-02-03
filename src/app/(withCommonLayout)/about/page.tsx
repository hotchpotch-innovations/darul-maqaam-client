import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { aboutData } from "../../../../public/data/AboutData";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import { MPS_Types } from "@/constants/options";
import { webpageSlugs } from "@/constants/webpageSlugs";

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

const AboutPage = async () => {
  const Title = dynamic(() => import("@/components/UI/titles/Title"));
  const Drawer = dynamic(() => import("@/components/UI/Drawer"));
  const backend_api = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const res = await fetch(
    `${backend_api}/content/multiple-page-section/public?type=${MPS_Types?.about}&sortBy=createdAt&sortOrder=asc`,
    {
      cache: "no-store",
    }
  );
  const { data: about_obj = {} } = await res.json();
  const about_data = about_obj?.data || [];
  return (
    <div>
      <Title title="about" />
      <Stack bgcolor={"secondary.main"}>
        <Drawer drawerData={about_data} />
      </Stack>
    </div>
  );
};

export default AboutPage;
