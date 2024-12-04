"use client";

import {
  useArticleAddFilesMutation,
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
import ArticleImagesSection from "./ArticleImagesSection";
import ArticleImageSection2 from "./ArticleImageSection2";

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
  // console.log("Images", images);
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

  const [addFiles, { isLoading: isAddFilesLoading }] =
    useArticleAddFilesMutation();

  const handleUpdateImage = async (files: any) => {
    const toastId = toast.loading("Please wait...");
    const values = { files };
    console.log("Values", values);

    const payload = modifyPayload(values);
    console.log("Payload", payload);
    try {
      const res = await addFiles({ ...payload, id }).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 3000 });
      console.log(error);
      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };

  if (isLoading) {
    return <p className="text-center my-8">Loading...</p>;
  }
  return (
    <>
      {/* <ArticleImagesSection
        article_data={article_data}
        images={images}
        selectedFiles={selectedFiles}
        remainingSlots={remainingSlots}
        handleFileChange={handleFileChange}
        handleRemoveImage={handleRemoveImage}
        handleUpdateImage={handleUpdateImage}
      /> */}

      <ArticleImageSection2 id={id} />

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
