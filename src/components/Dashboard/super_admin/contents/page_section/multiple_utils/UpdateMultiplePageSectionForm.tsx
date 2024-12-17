"use client";

import {
  useGetSingleMPSQuery,
  useUpdateMPSItemMutation,
} from "@/redux/api/content/multiplePageSectionApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Grid from "@mui/material/Grid2";
import CMStateInput from "@/components/forms/without_form_state_fields/CMStateInput";
import Editor from "@/components/forms/editors/Editor";

type TMultiplePageSectionPayload = {
  title?: string;
  price?: number;
  discount_rate?: number;
  yt_video_url?: URL;
  summary?: string;
  contents?: string;
};

type TProps = {
  id: string;
};
const UpdateMultiplePageSectionForm = ({ id }: TProps) => {
  const router = useRouter();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState("");
  const [discount_rate, setDiscountRate] = useState("");
  const [yt_video_url, setYtVideoUrl] = useState();
  const [summary, setSummary] = useState("");
  // Get updated value from text editor
  const [editorValue, setEditorValue] = useState("");

  const { data, isLoading } = useGetSingleMPSQuery(id);
  const mps_data = data?.data;

  useEffect(() => {
    if (!!mps_data) {
      setTitle(mps_data?.title);
      setPrice(mps_data?.price);
      setDiscountRate(mps_data?.discount_rate);
      setYtVideoUrl(mps_data?.yt_video_url);
      setSummary(mps_data?.summary);
      setEditorValue(mps_data?.contents);
    }
  }, [mps_data]);

  const [updateMultipleSection, { isLoading: isUpdateLoading }] =
    useUpdateMPSItemMutation();

  // create function handler
  const submitHandler = async () => {
    const toastId = toast.loading("Please wait ...");
    if (!title) {
      toast.error("Title is required!", { id: toastId, duration: 2000 });
    } else {
      const data: TMultiplePageSectionPayload = {};
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
      if (summary?.length > 0) {
        data["summary"] = summary;
      }

      if (editorValue?.length > 0) {
        data["contents"] = editorValue;
      }

      try {
        const res = await updateMultipleSection({ id, ...data }).unwrap();

        if (res?.success) {
          toast.success(res.message, { id: toastId, duration: 2000 });
          router.push("/dashboard/super_admin/content/page-section/multiple");
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
          {/* Title, Price, Discount(Price) & Youtube URL */}
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
                name="title"
                label="Title"
                setState={setTitle}
                defaultValue={title}
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMStateInput
                name="price"
                label="Price"
                setState={setPrice}
                type="number"
                defaultValue={price}
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMStateInput
                name="discount_rate"
                label="Discount (Rate)"
                setState={setDiscountRate}
                type="number"
                defaultValue={discount_rate}
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

        {/* Summary */}
        <Stack direction={{ xs: "column", lg: "row" }} gap={4}>
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
                name="summary"
                label="Summary"
                setState={setSummary}
                defaultValue={summary}
                fullWidth={true}
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
            <Editor setState={setEditorValue} defaultValue={editorValue} />
          </Grid>
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="submit"
          onClick={() => submitHandler()}
          disabled={isUpdateLoading}
          sx={{
            mt: "30px",
          }}
        >
          Update Item
        </Button>
      </Box>
    </>
  );
};

export default UpdateMultiplePageSectionForm;
