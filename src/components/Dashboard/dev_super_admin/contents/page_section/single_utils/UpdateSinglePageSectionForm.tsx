"use client";

import {
  useGetSinglePageSectionQuery,
  useUpdateSPSMutation,
} from "@/redux/api/content/singlePageSectionApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Grid from "@mui/material/Grid2";
import Editor from "@/components/forms/editors/Editor";
import SinglePageImages from "./SinglePageImages";
import Loading from "@/components/UI/LoadingBar";
import { z } from "zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { filterUndefinedValues } from "@/utils/sanitizeObject";
import CMForm from "@/components/forms/CMForm";
import { zodResolver } from "@hookform/resolvers/zod";
import CMInput from "@/components/forms/CMInput";
import CMTextarea from "@/components/forms/CMTextarea";

type TProps = {
  id: string;
};

const validationSchema = z.object({
  section_name: z.string().nonempty({ message: "Section name is required" }),
  yt_video_url: z.string().optional(),
  section_slug: z.string().nonempty({ message: "Section slug is required" }),
  section_title: z.string().optional(),
  section_summary: z.string().optional(),
  section_contents: z.string().optional(),
});

const UpdateSinglePageSectionForm = ({ id }: TProps) => {
  const router = useRouter();
  const [section_contents, setSectionContents] = useState("");

  const [updateSPS, { isLoading: isUpdateLoading }] = useUpdateSPSMutation();

  // create function handler
  const submitHandler: SubmitHandler<FieldValues> = async (values) => {
    const data = filterUndefinedValues(values);
    if (section_contents?.length > 0) {
      data["section_contents"] = section_contents;
    }
    const toastId = toast.loading("Please wait ...");
    try {
      const res = await updateSPS({ id, ...data }).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        router.push("/dashboard/dev_super_admin/content/page-section/single");
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

  const { data, isLoading: isGetSPSLoading } = useGetSinglePageSectionQuery(id);
  const sps_data = data?.data;

  useEffect(() => {
    if (!!sps_data) {
      setSectionContents(sps_data?.section_contents);
    }
  }, [sps_data]);

  if (!!isGetSPSLoading) {
    return <Loading />;
  }
  const defaultValues = {
    section_name: sps_data?.section_name || "",
    yt_video_url: sps_data?.yt_video_url || "",
    section_slug: sps_data?.section_slug || "",
    section_title: sps_data?.section_title || "",
    section_summary: sps_data?.section_summary || "",
    section_contents: sps_data.section_contents || "",
  };
  return (
    <>
      <SinglePageImages
        id={id}
        images={sps_data?.section_images}
        videos={sps_data?.section_videos}
      />
      <CMForm
        onSubmit={submitHandler}
        defaultValues={defaultValues}
        resolver={zodResolver(validationSchema)}
      >
        <Stack direction={"column"} spacing={4}>
          <Stack direction={"row"} gap={4}>
            {/* 1st Pera */}
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
                <CMInput
                  name="section_name"
                  label="Section Name"
                  fullWidth={true}
                />
              </Grid>
              <Grid size={12}>
                <CMInput
                  name="section_slug"
                  label="Section Slug"
                  fullWidth={true}
                />
              </Grid>
              <Grid size={12}>
                <CMInput
                  name="section_title"
                  label="Section Title"
                  fullWidth={true}
                />
              </Grid>
              <Grid size={12}>
                <CMTextarea name="section_summary" label="Section Summary" />
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
              <Editor
                setState={setSectionContents}
                defaultValue={section_contents}
              />
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
            Update Section
          </Button>
        </Box>
      </CMForm>
    </>
  );
};

export default UpdateSinglePageSectionForm;
