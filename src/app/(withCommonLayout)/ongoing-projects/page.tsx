import { Stack } from "@mui/material";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import dynamic from "next/dynamic";
import { MPS_Types } from "@/constants/options";

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

const OngoingPage = async () => {
  const Title = dynamic(() => import("@/components/UI/titles/Title"));
  const Drawer = dynamic(() => import("@/components/UI/Drawer"));
  const backend_api = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const res = await fetch(
    `${backend_api}/content/multiple-page-section/public?type=${MPS_Types?.ongoing_project}&sortBy=createdAt&sortOrder=asc`,
    {
      cache: "no-store",
    }
  );
  const { data: ongoing_project_obj = {} } = await res.json();
  const ongoingProjectData = ongoing_project_obj?.data || [];
  return (
    <>
      <Title title="ongoing projects" />
      <Stack bgcolor={"secondary.main"}>
        <Drawer drawerData={ongoingProjectData} />
      </Stack>
    </>
  );
};

export default OngoingPage;
