// components/ArticleImagesSection.tsx
import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

type ArticleImagesSectionProps = {
  article_data: any;
  images: any[];
  selectedFiles: any[];
  remainingSlots: number;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (imageKey: string) => void;
  handleUpdateImage: (updatedImages: any[]) => void;
};

const ArticleImagesSection = ({
  article_data,
  images,
  selectedFiles,
  remainingSlots,
  handleFileChange,
  handleRemoveImage,
  handleUpdateImage,
}: ArticleImagesSectionProps) => {
  return (
    <Grid container size={12} sx={{ marginBottom: "26px" }} spacing={2}>
      <Grid size={6}>
        <Image
          src={article_data?.cover_image?.url}
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
        {article_data?.images?.map((image: any) => (
          <Grid
            key={image?.key}
            size={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "relative", width: "100%", height: "auto" }}>
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
            <Box sx={{ position: "relative", width: "100%", height: "auto" }}>
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
        <button onClick={() => handleUpdateImage(images)}>Update</button>
      </Grid>
    </Grid>
  );
};

export default ArticleImagesSection;
