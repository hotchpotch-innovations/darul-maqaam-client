import { default_meta_info } from "@/constants/values";

type TProps = {
  redirect_url: string;
  slug: string;
};

export const generateDynamicMetadataHandler = async ({
  redirect_url,
  slug,
}: TProps) => {
  const backend_api = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const res = await fetch(`${backend_api}/content/webpage/${slug}`, {
    cache: "no-store",
  });
  const { data: webpage = {} } = await res.json();
  const {
    meta_title = `${default_meta_info?.meta_title} | Official site.`,
    meta_description = default_meta_info?.meta_description,
    meta_keywords = default_meta_info?.meta_keywords,
    og_image = "",
    og_author = default_meta_info?.og_author,
    title = default_meta_info?.meta_title,
  } = webpage;

  return {
    title: `${title} | ${default_meta_info?.meta_title}`, // Dynamic title
    description: meta_description, // Dynamic description
    keywords: meta_keywords,
    openGraph: {
      title: meta_title,
      author: og_author,
      description: meta_description,
      url: `${redirect_url}/${slug}`,
      images: [
        {
          url: og_image, // Replace with actual image URL
          width: 600,
          height: 400,
          alt: `${default_meta_info?.meta_title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta_title,
      description: meta_description,
      images: [og_image],
    },
  };
};
