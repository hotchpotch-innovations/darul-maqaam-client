"use client";
import { ChangeEvent, useEffect, useState } from "react";

import { toast } from "sonner";
import { Box, Button, IconButton } from "@mui/material";
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
  useChangeCoverImageMutation,
  useGetSingleArticleQuery,
} from "@/redux/api/content/articleApi";
import BannerImage from "./article_images/BannerImage";

type ArticleImagesSectionProps = {
  id: string;
};

const ArticleImagesSection = ({ id }: ArticleImagesSectionProps) => {
  // -------- State management --------

  // State for Banner images
  const [previewSelectedBanner, setPreviewSelectedBanner] = useState<
    string | null
  >(null);
  const [file, setFile] = useState<File | null>(null);

  // State for images
  const MAX_IMAGE_SLOTS = 4;
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  console.log(selectedFiles);
  const [remainingSlots, setRemainingSlots] = useState(MAX_IMAGE_SLOTS);

  // -------- API hook --------
  const { data: imagesData, isLoading } = useGetSingleArticleQuery(id);
  const [addFiles, { isLoading: isAddFilesLoading }] =
    useArticleAddFilesMutation();
  const [deleteFile, { isLoading: isFileDeleting }] =
    useArticleRemoveFileMutation();

  const [bannerImageChange, { isLoading: isBannerImageChanging }] =
    useChangeCoverImageMutation();

  const article_images = imagesData?.data;
  useEffect(() => {
    if (article_images?.images?.length) {
      setRemainingSlots(MAX_IMAGE_SLOTS - article_images.images.length);
    }
  }, [article_images]);

  // -------- Images file handaling function --------

  // Handle file input and limit the number of selected files
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  // Remove selected file from preview
  const handleRemoveImage = (imageKey: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.key !== imageKey));
    setRemainingSlots((prev) => prev + 1);

    const imageToRemove = selectedFiles.find((file) => file.key === imageKey);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.url);
    }
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
        {/* Left Section */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <BannerImage id={id} article_images={article_images} />
        </Grid>

        {/* Right Section */}
        <Grid size={{ xs: 12, lg: 6 }} spacing={2}>
          <Box>
            <Grid container spacing={2}>
              {/* Banner Image */}
              <Grid size={8}>
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

                  {/* Banner Image */}
                  {isBannerImageChanging || isLoading ? (
                    <Loading />
                  ) : (
                    <Image
                      src={
                        previewSelectedBanner ||
                        article_images?.cover_image?.url
                      }
                      alt="Banner Image"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "70%" }}
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
                {previewSelectedBanner && (
                  <Button
                    sx={{ marginTop: "5px" }}
                    type="submit"
                    disabled={isBannerImageChanging || !file}
                    onClick={handleBannerImageUpload}
                  >
                    Save Changes
                  </Button>
                )}
              </Grid>

              <Grid size={4}>
                {/* Render existing article images */}
                {article_images?.images?.map((image: any) => (
                  <Grid key={image?.key}>
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
                        width={100}
                        height={100}
                        sizes="100vw"
                        style={{
                          width: "100%",
                          height: "auto",
                          margin: "8px 0",
                        }}
                      />
                    </Box>
                  </Grid>
                ))}

                {/* Preview selected images files */}
                {selectedFiles.map((file: any) => (
                  <Grid
                    key={file?.key}
                    size={6}
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
                        height: "auto",
                      }}
                    >
                      <IconButton
                        onClick={() => handleRemoveImage(file.key)}
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
                        width={100}
                        height={100}
                        sizes="100vw"
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Grid>
                ))}

                {/* Add image button*/}
                {remainingSlots > 0 && (
                  <Grid
                    size={6}
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
                      onChange={handleFileChange}
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
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArticleImagesSection;
