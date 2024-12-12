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
import CMStateInput from "@/components/forms/without_form_state_fields/CMStateInput";
import CMMultipleInput from "@/components/forms/multiple_fields/CMMultipleInput";
import CMMultipleTextarea from "@/components/forms/multiple_fields/CMMultipleTextarea";
import Editor from "@/components/forms/editors/Editor";
import SinglePageImages from "./SinglePageImages";
import CMStateTextarea from "@/components/forms/without_form_state_fields/CMStateTextarea";
import Loading from "@/components/ui/LoadingBar";

type TSPSPayload = {
  section_name: string;
  section_slug: string;
  section_title?: string;
  section_summary?: string;
  yt_video_url?: string;
  section_contents?: string;
};

type TProps = {
  id: string;
};

const UpdateSinglePageSectionForm = ({ id }: TProps) => {
  const router = useRouter();
  const [section_name, setSectionName] = useState();
  const [section_slug, setSectionSlug] = useState();
  const [section_title, setSectionTitle] = useState("");
  const [section_summary, setSectionSummary] = useState("");
  const [yt_video_url, setYtVideoUrl] = useState("");
  const [section_contents, setSectionContents] = useState("");

  const { data, isLoading: isGetSPSLoading } = useGetSinglePageSectionQuery(id);
  const sps_data = data?.data;

  useEffect(() => {
    if (!!sps_data) {
      setSectionName(sps_data?.section_name);
      setSectionSlug(sps_data?.section_slug);
      setSectionTitle(sps_data?.section_title);
      setSectionSummary(sps_data?.section_summary);
      setYtVideoUrl(sps_data?.yt_video_url);
      setSectionContents(sps_data?.section_contents);
    }
  }, [sps_data]);

  const [updateSPS, { isLoading: isUpdateLoading }] = useUpdateSPSMutation();

  // create function handler
  const submitHandler = async () => {
    const toastId = toast.loading("Please wait ...");
    if (!section_name || !section_slug) {
      toast.error("Title is required!", { id: toastId, duration: 2000 });
    } else {
      const data: TSPSPayload = {
        section_name: section_name,
        section_slug: section_slug,
      };
      if (section_title?.length > 0) {
        data["section_title"] = section_title;
      }
      if (section_summary?.length > 0) {
        data["section_summary"] = section_summary;
      }
      if (yt_video_url?.length > 0) {
        data["yt_video_url"] = yt_video_url;
      }

      if (section_contents?.length > 0) {
        data["section_contents"] = section_contents;
      }

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
        toast.error(
          error?.message || "something went wrong. please try again",
          { id: toastId, duration: 2000 }
        );
        customTimeOut(3000).then(() => window.location.reload());
      }
    }
  };

  if (!!isGetSPSLoading) {
    return <Loading />;
  }

  return (
    <>
      <SinglePageImages
        id={id}
        images={sps_data?.section_images}
        videos={sps_data?.section_videos}
      />
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
              <CMStateInput
                name="section_name"
                label="Section Name"
                setState={setSectionName}
                defaultValue={section_name}
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMStateInput
                name="section_slug"
                label="Section Slug"
                setState={setSectionSlug}
                defaultValue={section_slug}
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMStateInput
                name="section_title"
                label="Section Title"
                setState={setSectionTitle}
                defaultValue={section_title}
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMStateTextarea
                name="section_summary"
                label="Section Summary"
                setState={setSectionSummary}
                defaultValue={section_summary}
              />
            </Grid>
            <Grid size={12}>
              <CMStateInput
                name="yt_video_url"
                label="Youtube Video URL (embedded)"
                setState={setYtVideoUrl}
                type="url"
                fullWidth={true}
                defaultValue={yt_video_url}
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
          onClick={() => submitHandler()}
          disabled={isUpdateLoading}
          sx={{
            mt: "30px",
          }}
        >
          Update Section
        </Button>
      </Box>
    </>
  );
};

export default UpdateSinglePageSectionForm;
