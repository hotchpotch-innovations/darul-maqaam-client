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

type TImageProps = {
  key: string;
  url: string;
};

const SinglePageImages = ({
  id,
  images,
}: {
  id: string;
  images: TImageProps[];
}) => {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const MAX_IMAGE_SLOTS = 4;
  const [remainingSlots, setRemainingSlots] = useState(MAX_IMAGE_SLOTS);

  useEffect(() => {
    if (images?.length) {
      setRemainingSlots(MAX_IMAGE_SLOTS - images?.length);
    }
  }, [images]);

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

  const handleRemoveImage = (imageKey: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.key !== imageKey));
    setRemainingSlots((prev) => prev + 1);
  };

  const handleUpdateImage = async () => {
    // Simulate API call
    toast.success("Images updated!");
  };

  const handleDeleteImages = async (key: string) => {
    // Simulate API call
    toast.success("Image deleted!");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* Left Section */}
        <Grid
          size={{ xs: 12, lg: 6 }}
          sx={{
            border: "1px solid #fff",
            borderRadius: 2,
            padding: 2,
            height: { xs: "30vh", lg: "40vh" },
            backgroundColor: "#000",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              border: "1px solid #fff",
              borderRadius: 2,
            }}
          />
        </Grid>

        {/* Right Section */}
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
