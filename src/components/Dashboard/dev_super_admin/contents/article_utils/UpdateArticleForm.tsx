"use client";

import {
  useGetSingleArticleQuery,
  useUpdateArticleMutation,
} from "@/redux/api/content/articleApi";
import { customTimeOut } from "@/utils/customTimeOut";

import { Box, Button, Stack, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent } from "react";
import { toast } from "sonner";
import CMStateInput from "@/components/forms/without_form_state_fields/CMStateInput";
import Editor from "@/components/forms/editors/Editor";
// Images
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { modifyPayload } from "@/utils/modifyPayload";

type TArticlePayload = {
  title?: string;
  author?: string;
  yt_video_url?: URL;
  summary?: string;
  contents?: string;
};

type TProps = {
  id: string;
};

const UpdateArticleForm = ({ id }: TProps) => {
  const router = useRouter();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState("");
  const [yt_video_url, setYtVideoUrl] = useState();
  const [summary, setSummary] = useState("");
  const [contents, setContents] = useState("");

  const { data, isLoading } = useGetSingleArticleQuery(id);
  const article_data = data?.data;

  // Article images = article_data?.images

  useEffect(() => {
    if (!!article_data) {
      setTitle(article_data?.title);
      setAuthor(article_data?.author);
      setYtVideoUrl(article_data?.yt_video_url);
      setSummary(article_data?.summary);
      setContents(article_data?.contents);
    }
  }, [article_data]);

  const [updateArticle, { isLoading: isUpdateLoading }] =
    useUpdateArticleMutation();

  // Article update function
  const submitHandler = async () => {
    const toastId = toast.loading("Please wait ...");
    if (!title) {
      toast.error("Title is required!", { id: toastId, duration: 2000 });
    } else {
      const data: TArticlePayload = {};
      data["title"] = title;
      if (!!author) {
        data["author"] = author;
      }
      if (!!yt_video_url) {
        data["yt_video_url"] = yt_video_url;
      }
      if (summary?.length > 0) {
        data["summary"] = summary;
      }

      if (contents?.length > 0) {
        data["contents"] = contents;
      }

      try {
        const res = await updateArticle({ id, ...data }).unwrap();

        if (res?.success) {
          toast.success(res.message, { id: toastId, duration: 2000 });
          router.push("/dashboard/dev_super_admin/content/articles/");
        } else {
          toast.error(res?.message, { id: toastId, duration: 2000 });
        }
      } catch (error: any) {
        console.log(error);
        toast.error(
          error?.message || "something went wrong. please try again",
          { id: toastId, duration: 2000 }
        );
        customTimeOut(3000).then(() => window.location.reload());
      }
    }
  };

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
    setImages((prev: any) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (imageKey: string) => {
    // Remove image from selected files
    setSelectedFiles((prev) => prev.filter((file) => file.key !== imageKey));

    // Remove image from final images list
    setImages((prev: any) =>
      prev.filter((image: any) => image.key !== imageKey)
    );

    // Revoke the object URL to free memory
    const imageToRemove = selectedFiles.find((file) => file.key === imageKey);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.url);
    }
  };

  remainingSlots = remainingSlots - images.length;

  const handleUpdateImage = (files: any) => {
    const payload = modifyPayload({ files });
    console.log(payload);
  };

  if (isLoading) {
    return <p className="text-center my-8">Loading...</p>;
  }
  return (
    <>
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
        <button onClick={() => handleUpdateImage(images)}>Update</button>
      </Grid>

      <Stack direction={"column"} spacing={4}>
        <Stack direction={"row"} gap={4}>
          {/* Title, Author & Youtube Video URL */}
          <Grid
            size={{ xs: 12 }}
            container
            gap={2}
            sx={{
              border: "1px solid lightgray",
              boxShadow: 1,
            }}
            p={4}
          >
            <Grid size={12}>
              <CMStateInput
                name="title"
                label="Title"
                setState={setTitle}
                defaultValue={title}
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMStateInput
                name="author"
                label="Author"
                setState={setAuthor}
                defaultValue={author}
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMStateInput
                name="yt_video_url"
                label="Youtube Video URL (embedded)"
                setState={setYtVideoUrl}
                type="url"
                defaultValue={yt_video_url}
                fullWidth={true}
              />
            </Grid>
          </Grid>
        </Stack>

        <Stack direction={{ xs: "column", lg: "row" }} gap={4}>
          {/* Summary */}
          <Grid
            size={12}
            container
            gap={2}
            sx={{
              border: "1px solid lightgray",
              boxShadow: 1,
            }}
            p={4}
          >
            <Grid size={12}>
              <CMStateInput
                name="summary"
                label="Summary"
                setState={setSummary}
                defaultValue={summary}
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <Editor setState={setContents} defaultValue={contents} />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => submitHandler()}
          type="submit"
          sx={{
            mt: "30px",
          }}
          disabled={isUpdateLoading}
        >
          Update Article
        </Button>
      </Box>
    </>
  );
};

export default UpdateArticleForm;
