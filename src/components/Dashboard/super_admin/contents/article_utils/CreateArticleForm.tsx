"use client";
import {
  TCategoryQueryObj,
  useCategoryOptions,
} from "@/hooks/content/useCategoryOptions";
import { useCreateArticleMutation } from "@/redux/api/content/articleApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Grid from "@mui/material/Grid2";
import { article_types_options } from "@/constants/options";
import CMStateFileInput from "@/components/forms/without_form_state_fields/CMStateFileInput";
import Editor from "@/components/forms/editors/Editor";
import { videoFileLimitation } from "@/utils/videoFileLimitation";
import { z } from "zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { filterUndefinedValues } from "@/utils/sanitizeObject";
import CMForm from "@/components/forms/CMForm";
import { create_article_default_values } from "@/constants/values";
import { zodResolver } from "@hookform/resolvers/zod";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import CMSelect from "@/components/forms/CMSelect";
import CMInput from "@/components/forms/CMInput";
import CMFileInput from "@/components/forms/CMFileInput";
import CMTextarea from "@/components/forms/CMTextarea";

const validationSchema = z.object({
  type: z.string().nonempty({ message: "Type is required." }),
  categoryId: z.string().nonempty({ message: "Category is required." }),
  title: z.string().nonempty({ message: "Title is required." }),
  cover_image: z.instanceof(File).optional(),
  summary: z.string().nonempty({ message: "Summary is required." }),
  yt_video_url: z.string().optional(),
  author: z.string().optional(),
});

const CreateArticleForm = () => {
  const router = useRouter();
  const categoryQueryObj: TCategoryQueryObj = {
    page: 1,
    limit: 50,
  };
  const [type, setType] = useState("");
  const [files, setFiles] = useState([]);
  // Get value from text editor
  const [contents, setContents] = useState("");

  if (!!type) {
    categoryQueryObj["type"] = type;
  }

  const { options: category_options, isLoading: isCategoryLoading } =
    useCategoryOptions(categoryQueryObj);

  const [createArticle, { isLoading: isCreateLoading }] =
    useCreateArticleMutation();

  // create function handler
  const submitHandler: SubmitHandler<FieldValues> = async (values) => {
    const data = filterUndefinedValues(values);
    const toastId = toast.loading("Please wait ...");
    if (files?.length > 0) {
      const videoFileValidation = videoFileLimitation(files);
      if (!videoFileValidation?.status) {
        return toast.error(videoFileValidation?.message, {
          id: toastId,
          duration: 3000,
        });
      } else {
        data["files"] = files;
      }
    }

    if (contents.length > 0) {
      data["contents"] = contents;
    }

    const payload = modifyPayload(data);
    try {
      const res = await createArticle(payload).unwrap();

      if (res?.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        router.push("/dashboard/super_admin/content/articles");
      } else {
        toast.error(res?.message, { id: toastId, duration: 2000 });
        console.log(res);
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
  return (
    <CMForm
      onSubmit={submitHandler}
      defaultValues={create_article_default_values}
      resolver={zodResolver(validationSchema)}
    >
      <Stack direction={"column"} spacing={4}>
        <Stack direction={{ xs: "column", lg: "row" }} gap={4}>
          {/* Type, Category & Title */}
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
              <CMSelectWithWatch
                name="type"
                label="Type"
                setState={setType}
                options={article_types_options}
              />
            </Grid>
            <Grid size={12}>
              <CMSelect
                name="categoryId"
                label="Category"
                fullWidth={true}
                items={category_options}
                isDisabled={isCategoryLoading}
              />
            </Grid>
            <Grid size={12}>
              <CMInput name="title" label="Title" fullWidth={true} />
            </Grid>
          </Grid>

          {/* Author, Youtube Video URl, Banner Image & Files(Images) */}
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
            <Grid size={12}>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                gap={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid size={6}>
                  <CMFileInput
                    name="cover_image"
                    label="Banner Image"
                    accept="image/*"
                  />
                </Grid>
                <Grid size={6}>
                  <CMStateFileInput
                    name="files"
                    label="Files"
                    accept="image/*, video/*"
                    setState={setFiles}
                    state={files}
                    multiple={true}
                    btn_width="100%"
                  />
                </Grid>
              </Stack>
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
          </Grid>

          {/* Text Editor */}
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
              <Editor setState={setContents} defaultValue={contents} />
            </Grid>
          </Grid>
        </Stack>
      </Stack>

      {/* Create article button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="submit"
          disabled={isCreateLoading}
          sx={{
            mt: "30px",
          }}
        >
          Create Article
        </Button>
      </Box>
    </CMForm>
  );
};

export default CreateArticleForm;
