"use client";

import {
  useGetSingleArticleQuery,
  useUpdateArticleMutation,
} from "@/redux/api/content/articleApi";
import { customTimeOut } from "@/utils/customTimeOut";

import { Box, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CMStateInput from "@/components/forms/without_form_state_fields/CMStateInput";
import Editor from "@/components/forms/editors/Editor";

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

  if (isLoading) {
    return <p className="text-center my-8">Loading...</p>;
  }
  return (
    <>
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
