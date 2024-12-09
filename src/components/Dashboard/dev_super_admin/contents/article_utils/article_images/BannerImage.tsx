import { Box, Button, IconButton } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Loading from "@/components/ui/LoadingBar";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { modifyPayload } from "@/utils/modifyPayload";
import { customTimeOut } from "@/utils/customTimeOut";
import { useChangeArticleCoverImageMutation } from "@/redux/api/content/articleApi";

const BannerImage = ({
  id,
  article_images,
}: {
  id: string;
  article_images: any;
}) => {
  // State for Banner images
  const [previewSelectedBanner, setPreviewSelectedBanner] = useState<
    string | null
  >(null);
  const [file, setFile] = useState<File | null>(null);

  const [bannerImageChange, { isLoading: isBannerImageChanging }] =
    useChangeArticleCoverImageMutation();

  // -------- Banner image file handling function --------
  const handleBannerImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const selectedFileUrl = URL.createObjectURL(selectedFile);
      setPreviewSelectedBanner(selectedFileUrl);
      setFile(selectedFile);
    }
  };

  // Handler for banner image update function
  const handleBannerImageUpload = async () => {
    if (!file) return;
    const toastId = toast.loading("Please wait...");
    const updatedBannerImage = modifyPayload({ file });

    const payload = {
      id,
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
    <>
      {/* Banner Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "auto",
          ":hover .removeButton": {
            opacity: 1,
          },
        }}
      >
        <IconButton
          className="removeButton"
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            backgroundColor: "white",
            color: "white",
            fontSize: "20px",
            padding: "2px",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
          onClick={() => {
            const fileInput = document.getElementById(
              "fileInput"
            ) as HTMLInputElement;
            fileInput.click();
          }}
        >
          <ChangeCircleIcon fontSize="large" color="info" />
        </IconButton>

        {isBannerImageChanging ? (
          <Loading />
        ) : (
          <Image
            src={previewSelectedBanner || article_images?.cover_image?.url}
            alt="Banner Image"
            width={100}
            height={100}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            priority
          />
        )}
        <input
          type="file"
          id="fileInput"
          hidden
          accept="image/*"
          onChange={handleBannerImageChange}
        />
      </Box>

      <Box sx={{ height: { xs: "42px", lg: "60px" } }}>
        <Button
          sx={{
            marginY: "8px",
            ...(previewSelectedBanner
              ? { visibility: "visible" }
              : { visibility: "hidden" }),
          }}
          type="submit"
          disabled={isBannerImageChanging || !file}
          onClick={handleBannerImageUpload}
        >
          Save Changes
        </Button>
      </Box>
    </>
  );
};

export default BannerImage;
