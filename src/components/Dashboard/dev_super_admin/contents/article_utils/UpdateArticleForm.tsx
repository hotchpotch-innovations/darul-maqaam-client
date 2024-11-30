"use client";

import {
  useGetSingleArticleQuery,
  useUpdateArticleMutation,
} from "@/redux/api/content/articleApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Grid from "@mui/material/Grid2";
import CMStateInput from "@/components/forms/without_form_state_fields/CMStateInput";
import CMMultipleInput from "@/components/forms/multiple_fields/CMMultipleInput";
import CMMultipleTextarea from "@/components/forms/multiple_fields/CMMultipleTextarea";

type TArticlePayload = {
  title?: string;
  author?: string;
  yt_video_url?: URL;
  sub_titles?: Array<string>;
  descriptions?: Array<string>;
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
  const [sub_titles, setSubTitles] = useState([""]);
  const [descriptions, setDescriptions] = useState([""]);

  const { data, isLoading } = useGetSingleArticleQuery(id);
  const article_data = data?.data;

  useEffect(() => {
    if (!!article_data) {
      setTitle(article_data?.title);
      setAuthor(article_data?.author);
      setYtVideoUrl(article_data?.yt_video_url);
      setSubTitles(article_data?.sub_titles);
      setDescriptions(article_data?.descriptions);
    }
  }, [article_data]);

  const [updateArticle, { isLoading: isUpdateLoading }] =
    useUpdateArticleMutation();

  // create function handler
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
      if (sub_titles?.length > 0) {
        data["sub_titles"] = sub_titles;
      }
      if (descriptions?.length > 0) {
        data["descriptions"] = descriptions;
      }

      // data["section_contents"] = draftToHtml(
      //   convertToRaw(editorState.getCurrentContent())
      // );

      try {
        const res = await updateArticle({ id, ...data }).unwrap();

        if (res?.success) {
          toast.success(res.message, { id: toastId, duration: 2000 });
          router.push("/dashboard/dev_super_admin/content/articles/");
        } else {
          toast.error(res?.message, { id: toastId, duration: 2000 });
          console.log(res);
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
          {/* 1st Pera */}
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
          {/* 1st Pera */}
          <Grid
            size={{ xs: 12, lg: 6 }}
            container
            gap={2}
            sx={{
              border: "1px solid lightgray",
              boxShadow: 1,
            }}
            p={4}
          >
            <Grid size={12}>
              <CMMultipleInput
                name="sub_titles"
                label="Sub sub_titles"
                setState={setSubTitles}
                states={sub_titles}
                fullWidth={true}
              />
            </Grid>
          </Grid>

          {/* 2nd Pera */}
          <Grid
            size={{ xs: 12, lg: 6 }}
            container
            gap={2}
            sx={{
              border: "1px solid lightgray",
              boxShadow: 1,
            }}
            p={4}
          >
            <Grid size={12}>
              <CMMultipleTextarea
                name="description"
                label="Descriptions"
                setState={setDescriptions}
                states={descriptions}
              />
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
