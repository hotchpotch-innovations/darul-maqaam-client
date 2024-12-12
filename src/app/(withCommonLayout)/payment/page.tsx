import Title from "@/components/UI/Title";
import { webpageSlugs } from "@/constants/webpageSlugs";
import { generateDynamicMetadataHandler } from "@/helpers/metadata/generateDynamicMetadataHandler";

// Dynamic metadata generation function
export async function generateMetadata() {
  const page_slug = webpageSlugs?.payment;
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const redirect_url = `${url}`;

  const result = await generateDynamicMetadataHandler({
    redirect_url,
    slug: page_slug,
  });

  return result;
}

const Payment = () => {
  return (
    <div>
      <Title title="Give Donation" />
    </div>
  );
};

export default Payment;
