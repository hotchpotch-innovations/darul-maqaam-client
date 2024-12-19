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
import Editor from "@/components/forms/editors/Editor";
import { z } from "zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { filterUndefinedValues } from "@/utils/sanitizeObject";
import Loading from "@/components/UI/LoadingBar";
import CMForm from "@/components/forms/CMForm";
import { zodResolver } from "@hookform/resolvers/zod";
import CMInput from "@/components/forms/CMInput";
import CMTextarea from "@/components/forms/CMTextarea";

const validationSchema = z.object({
  title: z.string().nonempty({ message: "Title is required." }),
  author: z.string().optional(),
  yt_video_url: z.string().optional(),
  summary: z.string().nonempty({ message: "Summary is required." }),
  cover_image: z.instanceof(File).optional(),
});

type TProps = {
  id: string;
};

const UpdateArticleForm = ({ id }: TProps) => {
  const router = useRouter();
  const [contents, setContents] = useState("");

  const [updateArticle, { isLoading: isUpdateLoading }] =
    useUpdateArticleMutation();

  // Article update function
  const submitHandler: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait ...");
    const data = filterUndefinedValues(values);

    if (contents?.length > 0) {
      data["contents"] = contents;
    }

    try {
      const res = await updateArticle({ id, ...data }).unwrap();

      if (res?.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        router.push("/dashboard/super_admin/content/articles/");
      } else {
        toast.error(res?.message, { id: toastId, duration: 2000 });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "something went wrong. please try again", {
        id: toastId,
        duration: 2000,
      });
      customTimeOut(3000).then(() => window.location.reload());
    }
  };

  const { data, isLoading: isGetSingleArticleLoading } =
    useGetSingleArticleQuery(id);
  const article_data = data?.data;

  useEffect(() => {
    if (!!article_data) {
      setContents(article_data?.contents);
    }
  }, [article_data]);

  if (isGetSingleArticleLoading) {
    return <Loading />;
  }
  const defaultValues = {
    title: article_data?.title || "",
    author: article_data?.author || "",
    yt_video_url: article_data?.yt_video_url || "",
    summary: article_data?.summary || "",
    contents: article_data.contents || "",
  };
  return (
    <CMForm
      onSubmit={submitHandler}
      defaultValues={defaultValues}
      resolver={zodResolver(validationSchema)}
    >
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
              <CMInput name="title" label="Title" fullWidth={true} />
            </Grid>
            <Grid size={12}>
              <CMInput name="author" label="Author" fullWidth={true} />
            </Grid>
            <Grid size={12}>
              <CMInput
                name="yt_video_url"
                label="Youtube Video URL (embedded)"
                type="url"
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
              <CMTextarea label="Summary" name="summary" />
            </Grid>
            <Grid size={12}>
              <Editor setState={setContents} defaultValue={contents} />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          sx={{
            mt: "30px",
          }}
          disabled={isUpdateLoading}
        >
          Update Article
        </Button>
      </Box>
    </CMForm>
  );
};

export default UpdateArticleForm;
