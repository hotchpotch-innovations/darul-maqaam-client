"use client";
import { Box, Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { modifyPayload } from "@/utils/modifyPayload";
import {
  useArticleAddFilesMutation,
  useGetSingleArticleQuery,
} from "@/redux/api/content/articleApi";
import { customTimeOut } from "@/utils/customTimeOut";
import Loading from "@/components/ui/LoadingBar";

type ArticleImagesSectionProps = {
  id: string;
};

const ArticleImagesSection = ({ id }: ArticleImagesSectionProps) => {
  const { data, isLoading } = useGetSingleArticleQuery(id);

  const article_images = data?.data;
  const MAX_IMAGE_SLOTS = 4;

  // const [images, setImages] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  console.log(selectedFiles);
  const [remainingSlots, setRemainingSlots] = useState(MAX_IMAGE_SLOTS);

  useEffect(() => {
    if (article_images?.images?.length) {
      // setImages(article_images.images);
      setRemainingSlots(MAX_IMAGE_SLOTS - article_images.images.length);
    }
  }, [article_images]);

  const [addFiles, { isLoading: isAddFilesLoading }] =
    useArticleAddFilesMutation();

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

  const handleRemoveImage = (imageKey: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.key !== imageKey));
    setRemainingSlots((prev) => prev + 1);

    const imageToRemove = selectedFiles.find((file) => file.key === imageKey);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.url);
    }
  };

  const handleUpdateImage = async () => {
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
    const toastId = toast.loading("Please wait...");
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

  return (
    <>
      {isAddFilesLoading ? (
        <Loading />
      ) : (
        <Grid container size={12} sx={{ marginBottom: "26px" }} spacing={2}>
          <Grid size={6}>
            <Image
              src={article_images?.cover_image?.url}
              alt="Banner Image"
              width={100}
              height={100}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </Grid>

          <Grid size={6} container spacing={2}>
            {/* Render existing article images */}
            {article_images?.images?.map((image: any) => (
              <Grid
                key={image?.key}
                size={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{ position: "relative", width: "100%", height: "auto" }}
                >
                  <IconButton
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
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Grid>
            ))}

            {/* Preview selected files */}
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
                  sx={{ position: "relative", width: "100%", height: "auto" }}
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

            {/* Add more images */}
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
            {selectedFiles.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <Button type="submit" size="small" onClick={handleUpdateImage}>
                  Update
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ArticleImagesSection;
