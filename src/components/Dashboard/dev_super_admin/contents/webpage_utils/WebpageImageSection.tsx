"use client";

import BannerImage from "@/components/Dashboard/common/bannerImage/BannerImage";
import Loading from "@/components/UI/LoadingBar";
import {
  useChangeWebpageOGImageMutation,
  useGetSingleWebpageQuery,
} from "@/redux/api/content/webpageApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Grid2 } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

type TWebpageImageSectionProps = {
  slug: string;
};
const WebpageImageSection = ({ slug }: TWebpageImageSectionProps) => {
  // State for Banner images
  const [previewSelectedBanner, setPreviewSelectedBanner] =
    useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const { data: webpage_data_obj, isLoading: isGetWebpageLoading } =
    useGetSingleWebpageQuery(slug);
  const webpage_data = webpage_data_obj?.data;

  const [bannerImageChange, { isLoading: isBannerImageUploading }] =
    useChangeWebpageOGImageMutation();

  if (!!isGetWebpageLoading) {
    return <Loading />;
  }

  // -------- Banner image file handling function --------
  const imageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const selectedFileUrl = URL.createObjectURL(selectedFile);
      setPreviewSelectedBanner(selectedFileUrl);
      setFile(selectedFile);
    }
  };

  // Handler for banner image update function
  const imageUploadHandler = async () => {
    if (!file) return;
    const toastId = toast.loading("Please wait...");
    const updatedBannerImage = modifyPayload({ file });

    const payload = {
      id: webpage_data?.id,
      payload: updatedBannerImage,
    };
    try {
      const res = await bannerImageChange(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setPreviewSelectedBanner("");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 3000 });

      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };
  return (
    <Box>
      <Grid2 container>
        <Grid2 size={{ xs: 12 }}>
          <BannerImage
            bannerImage={webpage_data?.og_image || ""}
            isLoading={isBannerImageUploading}
            selectedBanner={previewSelectedBanner}
            handleChange={imageChangeHandler}
            handleUpload={imageUploadHandler}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default WebpageImageSection;
