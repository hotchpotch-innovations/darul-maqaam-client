// import Banner from "@/components/UI/homes/Banner";
import DonateForm from "@/components/UI/homes/DonateForm";
import GallerySection from "@/components/UI/homes/GallerySection";
import MakeChange from "@/components/UI/homes/MakeChange";
import OnProject from "@/components/UI/homes/OngoingProjectsSection";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";

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

export default function Home() {
  const Banner = dynamic(() => import("@/components/UI/homes/Banner"), {
    ssr: false,
  });
  return (
    <Box bgcolor={"secondary.main"}>
      <DonateForm />
      <Banner />
      <MakeChange />
      <OnProject />
      <GallerySection />
    </Box>
  );
}
