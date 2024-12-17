"use client";
import { ChangeEvent, useEffect, useState } from "react";

import { toast } from "sonner";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { customTimeOut } from "@/utils/customTimeOut";
import { modifyPayload } from "@/utils/modifyPayload";

import Loading from "@/components/UI/LoadingBar";

import {
  useArticleAddFilesMutation,
  useArticleRemoveFileMutation,
  useChangeArticleCoverImageMutation,
  useGetSingleArticleQuery,
} from "@/redux/api/content/articleApi";
import BannerImage from "@/components/Dashboard/common/bannerImage/BannerImage";
import VideoSection from "@/components/Dashboard/common/videoSection/VideoSection";
import MultipleImage from "@/components/Dashboard/common/multipleImage/MultipleImage";

type ArticleImagesSectionProps = {
  id: string;
};

const ArticleFilesSection = ({ id }: ArticleImagesSectionProps) => {
  // -------- State management --------

  // States
  const [bannerFile, setBannerFile] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<any | null>(null);
  const [imageFiles, setImageFiles] = useState<any[]>([]);

  // State for images slots
  const MAX_IMAGE_SLOTS = 4;
  const [remainingSlots, setRemainingSlots] = useState(MAX_IMAGE_SLOTS);

  // -------- API hook --------
  const { data: imagesData, isLoading: isGetSingleArticleLoading } =
    useGetSingleArticleQuery(id);
  // console.log(imagesData.data.videos);
  const [addFiles, { isLoading: isAddFilesLoading }] =
    useArticleAddFilesMutation();
  const [deleteFile, { isLoading: isFileDeleting }] =
    useArticleRemoveFileMutation();

  const [bannerImageChange, { isLoading: isBannerImageChanging }] =
    useChangeArticleCoverImageMutation();

  const article_data = imagesData?.data;

  useEffect(() => {
    if (article_data?.images?.length) {
      setRemainingSlots(MAX_IMAGE_SLOTS - article_data.images.length);
    }
  }, [article_data]);

  // -------- Images file handling function --------

  // Handle file input and limit the number of selected files
  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (!files) return;

    // Convert FileList to Array and enforce the limit
    const fileArray = Array.from(files).slice(0, remainingSlots);

    // Generate preview URLs for selected files
    const newSelectedFiles = fileArray.map((file) => ({
      url: URL.createObjectURL(file),
      file,
      key: Math.random().toString(36).substring(2, 9),
    }));

    // Update selected files for preview
    setImageFiles((prev) => [...prev, ...newSelectedFiles]);
    setRemainingSlots((prev) => prev - newSelectedFiles.length);
  };

  // Handle file input and limit the number of selected files
  const handleVideoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files;
    if (!file) return;
    const bytes = 1000000;
    const selectedFileSize = file[0]?.size;
    const fileMBSize = selectedFileSize / bytes;

    if (fileMBSize > 10) {
      return toast.error(
        "File is too much large. You can access to upload maximum 10 mb file.",
        { duration: 5000 }
      );
    }

    const newSelectedFile = {
      url: URL.createObjectURL(file[0]),
      file,
      key: Math.random().toString(36).substring(2, 9),
    };
    console.log(newSelectedFile);
    setVideoFile(newSelectedFile);
    console.log({ file, fileMBSize, newSelectedFile });
  };

  // Remove selected image file from preview
  const handleRemoveSelectedImage = (imageKey: string) => {
    setImageFiles((prev) => prev.filter((file) => file.key !== imageKey));
    setRemainingSlots((prev) => prev + 1);
    const imageToRemove = imageFiles.find((file) => file.key === imageKey);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.url);
    }
  };

  // Remove selected video file from preview
  const handleRemoveSelectedVideo = () => {
    setVideoFile(null);
  };

  //  -------- API call functions --------

  // Handler for images update function
  const handleUpdateImage = async () => {
    const toastId = toast.loading("Please wait...");
    const selectedImage = imageFiles
      ?.filter((item) => item.file)
      .map((item) => item.file);

    const article_data = {
      files: selectedImage,
    };

    const updatedFiles = modifyPayload(article_data);

    const payload = {
      id,
      data: updatedFiles,
    };
    try {
      const res = await addFiles(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setImageFiles([]);
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 3000 });

      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };

  // Handler for video update function
  const handleUpdateVideo = async () => {
    const toastId = toast.loading("Please wait...");
    const selectedVideo = videoFile?.file[0];
    console.log("Video", { selectedVideo });
    const article_data = {
      files: [selectedVideo],
    };

    const updatedFiles = modifyPayload(article_data);
    const payload = {
      id,
      data: updatedFiles,
    };

    try {
      const res = await addFiles(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setVideoFile(null);
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 3000 });

      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };

  // Handler for image delete function
  const handleDeleteImages = async (key: string) => {
    const toastId = toast.loading("Deleting...");
    const payload = {
      id,
      previous_image_key: key,
    };
    try {
      const res = await deleteFile(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setImageFiles([]);
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 3000 });

      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };

  // Handler for video delete function
  const handleDeleteVideo = async (key: string) => {
    const toastId = toast.loading("Please wait...");
    const payload = {
      id,
      previous_video_key: key,
    };
    try {
      const res = await deleteFile(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setVideoFile(null);
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 3000 });

      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };

  // -------- Banner image file handling function --------
  const handleBannerImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const selectedFileUrl = URL.createObjectURL(selectedFile);
      setBannerFile(selectedFileUrl);
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
        setBannerFile("");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 3000 });

      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };

  if (!!isGetSingleArticleLoading) {
    return <Loading />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/* Left Side  */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <BannerImage
            isLoading={isBannerImageChanging}
            selectedBanner={bannerFile}
            bannerImage={article_data?.cover_image?.url}
            handleChange={handleBannerImageChange}
            handleUpload={handleBannerImageUpload}
          />
        </Grid>

        {/* Right Side  */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Image Section */}
            <Typography>Images Section:</Typography>
            <MultipleImage
              data={article_data?.images}
              changeHandler={handleImageFileChange}
              deleteHandler={handleDeleteImages}
              removeHandler={handleRemoveSelectedImage}
              updateHandler={handleUpdateImage}
              selectedFiles={imageFiles}
              isLoading={isAddFilesLoading}
              remainingSlots={remainingSlots}
            />

            {/* Video Section */}
            <Typography>Video Section:</Typography>
            <Grid container>
              <VideoSection
                data={{
                  url: article_data?.videos[0]?.url,
                  key: article_data?.videos[0]?.key,
                }}
                selectedFile={videoFile}
                removeHandler={handleRemoveSelectedVideo}
                deleteHandler={handleDeleteVideo}
                fileChangeHandler={handleVideoFileChange}
                isUploadLoading={isFileDeleting}
                uploadHandler={handleUpdateVideo}
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArticleFilesSection;
