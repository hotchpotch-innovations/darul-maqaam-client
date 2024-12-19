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
import Editor from "@/components/forms/editors/Editor";
import Loading from "@/components/UI/LoadingBar";
import { z } from "zod";
import { filterUndefinedValues } from "@/utils/sanitizeObject";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CMForm from "@/components/forms/CMForm";
import { zodResolver } from "@hookform/resolvers/zod";
import CMInput from "@/components/forms/CMInput";
import CMTextarea from "@/components/forms/CMTextarea";

type TProps = {
  id: string;
};

const validationSchema = z.object({
  title: z.string().nonempty({ message: "Title is required." }),
  summary: z.string().nonempty({ message: "Summary is required." }),
  yt_video_url: z.string().optional(),
  price: z.number({ message: "Price must be number type" }).optional(),
  discount_rate: z
    .number({ message: "Discount rate is must be number type" })
    .optional(),
});

const UpdateMultiplePageSectionForm = ({ id }: TProps) => {
  const router = useRouter();
  // Get updated value from text editor
  const [editorValue, setEditorValue] = useState("");

  const [updateMultipleSection, { isLoading: isUpdateLoading }] =
    useUpdateMPSItemMutation();

  // create function handler
  const submitHandler: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait ...");
    const data = filterUndefinedValues(values);

    if (editorValue?.length > 0) {
      data["contents"] = editorValue;
    }

    try {
      const res = await updateMultipleSection({ id, ...data }).unwrap();

      if (res?.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        router.push("/dashboard/dev_super_admin/content/page-section/multiple");
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

  const { data, isLoading: isGetSingleMPSLoading } = useGetSingleMPSQuery(id);
  const mps_data = data?.data;

  useEffect(() => {
    if (!!mps_data) {
      setEditorValue(mps_data?.contents);
    }
  }, [mps_data]);

  if (isGetSingleMPSLoading) {
    return <Loading />;
  }

  const defaultValues = {
    title: mps_data?.title || "",
    price: mps_data?.price || undefined,
    discount: mps_data?.price || undefined,
    yt_video_url: mps_data?.yt_video_url || "",
    summary: mps_data?.summary || "",
    contents: mps_data?.contents || "",
  };

  return (
    <CMForm
      onSubmit={submitHandler}
      defaultValues={defaultValues}
      resolver={zodResolver(validationSchema)}
    >
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
              <CMInput name="title" label="Title" fullWidth={true} />
            </Grid>
            <Grid size={12}>
              <CMInput
                name="price"
                label="Price"
                type="number"
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMInput
                name="discount_rate"
                label="Discount (Rate)"
                type="number"
                fullWidth={true}
              />
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
              <CMTextarea label="Summary" name="summary" />
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
          disabled={isUpdateLoading}
          sx={{
            mt: "30px",
          }}
        >
          Update Item
        </Button>
      </Box>
    </CMForm>
  );
};

export default UpdateMultiplePageSectionForm;
