import Banner from "@/components/UI/home/Banner";
import DonateForm from "@/components/UI/home/DonateForm";
import GallerySection from "@/components/UI/home/GallerySection";
import MakeChange from "@/components/UI/home/MakeChange";
import OnProject from "@/components/UI/home/OngoingProjectsSection";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import { Box } from "@mui/material";

// Dynamic metadata generation function
export async function generateMetadata() {
  const page_slug = webpageSlugs?.home;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    slug: page_slug,
  });

  return result;
}

const Home = () => {
  return (
    <Box bgcolor={"secondary.main"}>
      <DonateForm />
      <Banner />
      <MakeChange />
      <OnProject />
      <GallerySection />
    </Box>
  );
};

export default Home;
