import Image from "next/image";
import { Box, Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { customTimeOut } from "@/utils/customTimeOut";
import { modifyPayload } from "@/utils/modifyPayload";
import {
  useSinglePSAddFilesMutation,
  useSinglePSRemoveFileMutation,
} from "@/redux/api/content/singlePageSectionApi";
import VideoSection from "@/components/Dashboard/common/videoSection/VideoSection";

type TImageProps = {
  key: string;
  url: string;
};

const SinglePageImages = ({
  id,
  images,
  videos,
}: {
  id: string;
  images: TImageProps[];
  videos: TImageProps[];
}) => {
  // -------- State Management --------

  // Images state
  const MAX_IMAGE_SLOTS = 4;
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [remainingSlots, setRemainingSlots] = useState(MAX_IMAGE_SLOTS);

  // Videos state
  const [videoFile, setVideoFile] = useState<any | null>(null);

  useEffect(() => {
    if (images?.length) {
      setRemainingSlots(MAX_IMAGE_SLOTS - images?.length);
    }
  }, [images]);

  const [addFiles, { isLoading: isAddFilesLoading }] =
    useSinglePSAddFilesMutation();

  const [deleteFile, { isLoading: isFileDeleting }] =
    useSinglePSRemoveFileMutation();

  // -------- Images file handling function --------

  // Handle file input and limit the number of selected files
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files).slice(0, remainingSlots);
    const newSelectedFiles = fileArray.map((file) => ({
      url: URL.createObjectURL(file),
      file,
      key: Math.random().toString(36).substring(2, 9),
    }));

    setSelectedFiles((prev) => [...prev, ...newSelectedFiles]);
    setRemainingSlots((prev) => prev - newSelectedFiles.length);
  };

  // Remove selected image file from preview
  const handleRemoveImage = (imageKey: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.key !== imageKey));
    setRemainingSlots((prev) => prev + 1);
    const imageToRemove = selectedFiles.find((file) => file.key === imageKey);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.url);
    }
  };

  // -------- Videos file handling function --------

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

  // Remove selected video file from preview
  const handleRemoveSelectedVideo = () => {
    setVideoFile(null);
  };

  //  -------- API call functions for images --------

  // Handler for images update function
  const handleUpdateImage = async () => {
    const toastId = toast.loading("Please wait...");
    const selectedImage = selectedFiles
      ?.filter((item) => item.file)
      .map((item) => item.file);

    const updatedFiles = modifyPayload({ files: selectedImage });

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
      previous_section_image_key: key,
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

  //  -------- API call functions for videos --------
  // Handler for video update function
  const handleUpdateVideo = async () => {
    const toastId = toast.loading("Please wait...");
    const selectedVideo = videoFile?.file[0];

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

  // Handler for video delete function
  const handleDeleteVideo = async (key: string) => {
    const toastId = toast.loading("Please wait...");
    const payload = {
      id,
      previous_section_video_key: key,
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

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* Video Section */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <VideoSection
            data={{
              url: videos[0]?.url,
              key: videos[0]?.key,
            }}
            selectedFile={videoFile}
            removeHandler={handleRemoveSelectedVideo}
            deleteHandler={handleDeleteVideo}
            fileChangeHandler={handleVideoFileChange}
            isUploadLoading={isFileDeleting}
            uploadHandler={handleUpdateVideo}
          />
        </Grid>

        {/* images Section */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Grid container spacing={2}>
            {/* Render Existing Images */}
            {images.map((image) => (
              <Grid
                key={image.key}
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
                    className="removeButton"
                    onClick={() => handleDeleteImages(image.key)}
                    sx={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      backgroundColor: "white",
                      color: "red",
                      padding: "2px",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <Image
                    src={image.url}
                    alt="Image"
                    width={150}
                    height={150}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Grid>
            ))}

            {/* Render Selected Images */}
            {selectedFiles.map((file) => (
              <Grid
                key={file.key}
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
                    height: "150px",
                    border: "1px solid #fff",
                    borderRadius: 2,
                    overflow: "hidden",
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
                      padding: "2px",
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                  <Image
                    src={file.url}
                    alt="Preview"
                    width={150}
                    height={150}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Grid>
            ))}

            {/* Add Image Button */}
            {remainingSlots > 0 && (
              <Grid size={6}>
                <Box
                  sx={{
                    width: "100%",
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px dashed #fff",
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                >
                  <label htmlFor="upload-button">
                    <AddCircleIcon fontSize="large" color="info" />
                  </label>
                  <input
                    id="upload-button"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </Box>
              </Grid>
            )}

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
                  // disabled={isAddFilesLoading}
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
      </Grid>
    </Box>
  );
};

export default SinglePageImages;
