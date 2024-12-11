import Banner from "@/components/UI/home/Banner";
import DonateForm from "@/components/UI/home/DonateForm";
import GallerySection from "@/components/UI/home/GallerySection";
import MakeChange from "@/components/UI/home/MakeChange";
import OnProject from "@/components/UI/home/OngoingProjectsSection";

export default function Home() {
  return (
    <main>
      <DonateForm />
      <Banner />
      <MakeChange />
      <OnProject />
      <GallerySection />
    </main>
  );
}
