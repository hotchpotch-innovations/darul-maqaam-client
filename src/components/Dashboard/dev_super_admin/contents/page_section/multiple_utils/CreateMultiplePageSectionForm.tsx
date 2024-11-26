"use client";

import Editor from "@/components/forms/editors/Editor";
import CMMultipleInput from "@/components/forms/multiple_fields/CMMultipleInput";
import CMMultipleTextarea from "@/components/forms/multiple_fields/CMMultipleTextarea";
import CMSelectStateInput from "@/components/forms/without_form_state_fields/CMSelectStateInput";
import CMStateFileInput from "@/components/forms/without_form_state_fields/CMStateFileInput";
import CMStateInput from "@/components/forms/without_form_state_fields/CMStateInput";
import { multiple_page_section_types_options } from "@/constants/options";
import {
  TCategoryQueryObj,
  useCategoryOptions,
} from "@/hooks/content/useCategoryOptions";
import { useCreateMultipleSectionMutation } from "@/redux/api/content/multiplePageSectionApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type TMultiplePageSectionPayload = {
  type?: string;
  categoryId?: string;
  title?: string;
  price?: number;
  discount_rate?: number;
  yt_video_url?: URL;
  cover_image?: any;
  files?: any;
  sub_titles?: Array<string>;
  descriptions?: Array<string>;
  contents?: string;
};

const CreateMultiplePageSectionForm = () => {
  const router = useRouter();
  const categoryQueryObj: TCategoryQueryObj = {
    page: 1,
    limit: 50,
  };
  const [type, setType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState();
  const [price, setPrice] = useState("");
  const [discount_rate, setDiscountRate] = useState("");
  const [yt_video_url, setYtVideoUrl] = useState();
  const [cover_image, setCoverImage] = useState(null);
  const [files, setFiles] = useState(null);
  const [sub_titles, setSubTitles] = useState([""]);
  const [descriptions, setDescriptions] = useState([""]);
  // Get value from text editor
  const [editorValue, setEditorValue] = useState("");

  // console.log({
  //   type,
  //   categoryId,
  //   title,
  //   price,
  //   discount_rate,
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

  const [createMultipleSection, { isLoading: isCreateLoading }] =
    useCreateMultipleSectionMutation();

  // create function handler
  const submitHandler = async () => {
    const toastId = toast.loading("Please wait ...");
    if (!type || !categoryId || !title) {
      toast.error("Data does not found!", { id: toastId, duration: 2000 });
    } else {
      const data: TMultiplePageSectionPayload = {};

      data["type"] = type;
      data["categoryId"] = categoryId;
      data["title"] = title;
      if (!!price) {
        data["price"] = parseFloat(price);
      }
      if (!!discount_rate) {
        data["discount_rate"] = parseFloat(discount_rate);
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

      if (editorValue.length > 0) {
        data["contents"] = editorValue;
      }

      const payload = modifyPayload(data);
      // console.log(data);
      try {
        const res = await createMultipleSection(payload).unwrap();

        if (res?.success) {
          toast.success(res.message, { id: toastId, duration: 2000 });
          router.push(
            "/dashboard/dev_super_admin/content/page-section/multiple"
          );
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
                items={multiple_page_section_types_options}
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
                name="price"
                label="Price"
                setState={setPrice}
                type="number"
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMStateInput
                name="discount_rate"
                label="Discount (Rate)"
                setState={setDiscountRate}
                type="number"
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

        {/* Rich Text Editor */}
        <Stack direction={"row"} gap={4}>
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
            {/* Rich text editor */}
            <Editor onChange={setEditorValue} />
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
        Create Item
      </Button>
    </>
  );
};

export default CreateMultiplePageSectionForm;
