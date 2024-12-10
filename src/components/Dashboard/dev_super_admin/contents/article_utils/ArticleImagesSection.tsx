"use client";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

import { toast } from "sonner";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { customTimeOut } from "@/utils/customTimeOut";
import { modifyPayload } from "@/utils/modifyPayload";

import Loading from "@/components/ui/LoadingBar";

import {
  useArticleAddFilesMutation,
  useArticleRemoveFileMutation,
  useChangeArticleCoverImageMutation,
  useGetSingleArticleQuery,
} from "@/redux/api/content/articleApi";
import BannerImage from "@/components/Dashboard/common/bannerImage/BannerImage";
import VideoSection from "@/components/Dashboard/common/videoSection/VideoSection";

type ArticleImagesSectionProps = {
  id: string;
};

const ArticleImagesSection = ({ id }: ArticleImagesSectionProps) => {
  // -------- State management --------

  // State for Banner images
  const [previewSelectedBanner, setPreviewSelectedBanner] =
    useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const [videoFile, setVideoFile] = useState<any | null>(null);

  // State for images
  const MAX_IMAGE_SLOTS = 4;
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [remainingSlots, setRemainingSlots] = useState(MAX_IMAGE_SLOTS);

  // -------- API hook --------
  const { data: imagesData, isLoading } = useGetSingleArticleQuery(id);
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
    const files = event.target.files;
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
    setSelectedFiles((prev) => [...prev, ...newSelectedFiles]);
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
    setSelectedFiles((prev) => prev.filter((file) => file.key !== imageKey));
    setRemainingSlots((prev) => prev + 1);
    const imageToRemove = selectedFiles.find((file) => file.key === imageKey);
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
    const selectedImage = selectedFiles
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
        setSelectedFiles([]);
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
        setSelectedFiles([]);
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {/*
          Banner Image
        */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <BannerImage
            isLoading={isBannerImageChanging}
            selectedBanner={previewSelectedBanner}
            bannerImage={article_data?.cover_image?.url}
            handleChange={handleBannerImageChange}
            handleUpload={handleBannerImageUpload}
          />
        </Grid>

        {/*
          Post Images
        */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>Images Section:</Typography>
            {/* Post Images */}
            <Grid
              container
              spacing={2}
              sx={{
                width: "95%",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              {/* Render existing article images */}
              {article_data?.images?.map((image: any) => (
                <Grid size={3} key={image?.key}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "150px",
                      border: "1px solid #fff",
                      borderRadius: 2,
                      overflow: "hidden",
                      ":hover .removeButton": {
                        opacity: 1,
                      },
                    }}
                  >
                    <IconButton
                      onClick={() => handleDeleteImages(image?.key)}
                      className="removeButton"
                      sx={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        backgroundColor: "white",
                        color: "red",
                        fontSize: "20px",
                        padding: "2px",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>

                    <Image
                      src={image?.url}
                      alt="Banner Image"
                      width={150}
                      height={150}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Grid>
              ))}

              {/* Preview selected images files */}
              {selectedFiles.map((file: any) => (
                <Grid
                  key={file?.key}
                  size={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "150px",
                      border: "1px solid #fff",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <IconButton
                      onClick={() => handleRemoveSelectedImage(file.key)}
                      sx={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        backgroundColor: "white",
                        color: "red",
                        fontSize: "20px",
                        padding: "2px",
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>

                    <Image
                      src={file.url}
                      alt="Selected Image Preview"
                      width={150}
                      height={150}
                      // sizes="100vw"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Grid>
              ))}

              {/* Add image button*/}
              {remainingSlots > 0 && (
                <Grid
                  size={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label htmlFor="upload-button">
                    <Box
                      sx={{
                        width: "100%",
                        padding: "10px 5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <AddCircleIcon fontSize="large" color="info" />
                    </Box>
                  </label>
                  <input
                    id="upload-button"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageFileChange}
                  />
                </Grid>
              )}

              {/* Update button */}
              {selectedFiles.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "8px",
                    width: "100%",
                    maxHeight: "34px",
                  }}
                >
                  <Button
                    disabled={isAddFilesLoading}
                    type="submit"
                    size="small"
                    onClick={handleUpdateImage}
                  >
                    Update
                  </Button>
                </Box>
              )}
            </Grid>

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

export default ArticleImagesSection;
