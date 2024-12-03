import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { useState, ChangeEvent } from "react";
import { useGetSingleArticleQuery } from "@/redux/api/content/articleApi";

type ArticleFilesProps = {
  article_data: any;
};

const ArticleFiles = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSingleArticleQuery(id);
  const article_data = data?.data;
  // Image update
  const [images, setImages] = useState(article_data?.images || []);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  console.log("Images", images);
  let remainingSlots = 4 - article_data?.images.length;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    console.log("Fiels: ", files);

    // Convert FileList to Array and enforce the limit
    const fileArray = Array.from(files).slice(0, remainingSlots);
    console.log("FileArray", fileArray);

    // Generate preview URLs for selected files
    const newSelectedFiles = fileArray.map((file) => ({
      url: URL.createObjectURL(file),
      file,
      key: Math.random().toString(36).substring(2, 9),
    }));
    console.log(newSelectedFiles);

    // Update selected files for preview
    setSelectedFiles((prev) => [...prev, ...newSelectedFiles]);

    // Update state with the new images for final submission
    const newImages = newSelectedFiles.map((file) => ({
      url: file.url,
      file: file.file,
      key: file.key,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (imageKey: string) => {
    // Remove image from selected files
    setSelectedFiles((prev) => prev.filter((file) => file.key !== imageKey));

    // Remove image from final images list
    setImages((prev) => prev.filter((image: any) => image.key !== imageKey));

    // Revoke the object URL to free memory
    const imageToRemove = selectedFiles.find((file) => file.key === imageKey);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.url);
    }
  };

  remainingSlots = remainingSlots - images.length;
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
        {article_data?.images.map((image: any) => (
          <Grid
            size={6}
            key={image?.key}
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
                "&:hover .removeButton": {
                  opacity: 1,
                },
              }}
            >
              {/* Delete button */}
              <IconButton
                // onClick={() => handleRemoveImage(image.key)}
                className="removeButton"
                sx={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  backgroundColor: "white",
                  color: "red",
                  fontSize: "20px",
                  padding: "2px",
                  minWidth: "auto",
                  height: "auto",
                  opacity: 0, // Initially hidden
                  transition: "opacity 0.3s ease", // Smooth transition
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              {/* Image */}
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

        {/* Preview the selected files */}
        {selectedFiles.map((file: any) => (
          <Grid
            size={6}
            key={file?.key}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Image Container with Hover Effect */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "auto",
              }}
            >
              {/* Cross button */}
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
                  minWidth: "auto",
                  height: "auto",
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>

              {/* Image */}
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

        {2 > 0 && (
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
                  height: "auto",
                  padding: { xs: "10px 5px" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // border: "2px dashed #ccc",
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
      </Grid>
    </Grid>
  );
};

export default ArticleFiles;
