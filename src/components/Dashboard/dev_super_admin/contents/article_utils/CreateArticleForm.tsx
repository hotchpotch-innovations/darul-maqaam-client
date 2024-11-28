"use client";
import {
  TCategoryQueryObj,
  useCategoryOptions,
} from "@/hooks/content/useCategoryOptions";
import { useCreateArticleMutation } from "@/redux/api/content/articleApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Grid from "@mui/material/Grid2";
import CMSelectStateInput from "@/components/forms/without_form_state_fields/CMSelectStateInput";
import { article_types_options } from "@/constants/options";
import CMStateInput from "@/components/forms/without_form_state_fields/CMStateInput";
import CMStateFileInput from "@/components/forms/without_form_state_fields/CMStateFileInput";
import CMMultipleInput from "@/components/forms/multiple_fields/CMMultipleInput";
import CMMultipleTextarea from "@/components/forms/multiple_fields/CMMultipleTextarea";

type TArticlePayload = {
  type?: string;
  categoryId?: string;
  title?: string;
  yt_video_url?: URL;
  author?: string;
  cover_image?: any;
  files?: any;
  sub_titles?: Array<string>;
  descriptions?: Array<string>;
};

const CreateArticleForm = () => {
  const router = useRouter();
  const categoryQueryObj: TCategoryQueryObj = {
    page: 1,
    limit: 50,
  };
  const [type, setType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState("");
  const [yt_video_url, setYtVideoUrl] = useState();
  const [cover_image, setCoverImage] = useState(null);
  const [files, setFiles] = useState(null);
  const [sub_titles, setSubTitles] = useState([""]);
  const [descriptions, setDescriptions] = useState([""]);

  // console.log({
  //   type,
  //   categoryId,
  //   title,
  //   author,
  //   yt_video_url,
  //   cover_image,
  //   files,
  //   sub_titles,
  //   descriptions,
  // });

  if (!!type) {
    categoryQueryObj["type"] = type;
  }

  const { options: category_options, isLoading: isCategoryLoading } =
    useCategoryOptions(categoryQueryObj);

  const [createArticle, { isLoading: isCreateLoading }] =
    useCreateArticleMutation();

  // create function handler
  const submitHandler = async () => {
    const toastId = toast.loading("Please wait ...");
    if (!type || !categoryId || !title) {
      toast.error("Data does not found!", { id: toastId, duration: 2000 });
    } else {
      const data: TArticlePayload = {};
      data["type"] = type;
      data["categoryId"] = categoryId;
      data["title"] = title;
      if (!!author) {
        data["author"] = author;
      }
      if (!!yt_video_url) {
        data["yt_video_url"] = yt_video_url;
      }
      if (!!cover_image) {
        data["cover_image"] = cover_image;
      }
      if (!!files) {
        data["files"] = files;
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

      const payload = modifyPayload(data);
      // console.log({ payload });
      try {
        const res = await createArticle(payload).unwrap();

        if (res?.success) {
          toast.success(res.message, { id: toastId, duration: 2000 });
          router.push("/dashboard/dev_super_admin/content/articles");
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
  return (
    <>
      <Stack direction={"column"} spacing={4}>
        <Stack direction={"row"} gap={4}>
          {/* 1st Pera */}
          <Grid
            size={{ xs: 3, md: 6 }}
            container
            gap={2}
            sx={{
              border: "1px solid lightgray",
              boxShadow: 1,
            }}
            p={4}
          >
            <Grid size={12}>
              <CMSelectStateInput
                name="type"
                label="Type"
                setState={setType}
                state={type}
                fullWidth={true}
                items={article_types_options}
              />
            </Grid>
            <Grid size={12}>
              <CMSelectStateInput
                name="categoryId"
                label="Category"
                setState={setCategoryId}
                state={categoryId}
                fullWidth={true}
                items={category_options}
                isDisabled={isCategoryLoading}
              />
            </Grid>
            <Grid size={12}>
              <CMStateInput
                name="title"
                label="Title"
                setState={setTitle}
                fullWidth={true}
              />
            </Grid>
          </Grid>

          {/* 2nd Pera */}
          <Grid
            size={{ xs: 3, md: 6 }}
            container
            gap={2}
            sx={{
              border: "1px solid lightgray",
              boxShadow: 1,
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
            }}
            p={4}
          >
            <Grid size={12}>
              <CMStateInput
                name="author"
                label="Author"
                setState={setAuthor}
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMStateInput
                name="yt_video_url"
                label="Youtube Video URL (embedded)"
                setState={setYtVideoUrl}
                type="url"
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <Stack direction={"row"} gap={2}>
                <Grid size={6}>
                  <CMStateFileInput
                    name="cover_image"
                    label="Banner Image"
                    accept="image/*"
                    setState={setCoverImage}
                    btn_width="100%"
                    state={cover_image}
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

        <Stack direction={"row"} gap={4}>
          {/* 1st Pera */}
          <Grid
            size={{ xs: 3, md: 6 }}
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
            size={{ xs: 3, md: 6 }}
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

      <Button
        onClick={() => submitHandler()}
        type="submit"
        fullWidth
        sx={{
          mt: "30px",
        }}
        disabled={isCreateLoading}
      >
        Create Article
      </Button>
    </>
  );
};

export default CreateArticleForm;
