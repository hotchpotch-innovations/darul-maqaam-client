import { Box } from "@mui/material";
import { aboutData } from "../../../../public/data/AboutData";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import dynamic from "next/dynamic";
import { MPS_Types } from "@/constants/options";

// Dynamic metadata generation function
export async function generateMetadata() {
  const page_slug = webpageSlugs?.projects;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    slug: page_slug,
  });

  return result;
}

const ProjectsPage = async () => {
  const Title = dynamic(() => import("@/components/UI/Title"));
  const Drawer = dynamic(() => import("@/components/UI/Drawer"));
  const backend_api = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const res = await fetch(
    `${backend_api}/content/multiple-page-section/public?type=${MPS_Types?.project}&sortBy=createdAt&sortOrder=asc`,
    {
      cache: "no-store",
    }
  );
  const { data: project_obj = {} } = await res.json();
  const project_data = project_obj?.data || [];
  return (
    <>
      <Title title="projects" />
      <Box bgcolor={"secondary.main"}>
        <Drawer drawerData={project_data} />
      </Box>
    </>
  );
};

export default ProjectsPage;
