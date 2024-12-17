"use client";

import {
  TMenubarQueryObj,
  useMenubarOptions,
} from "@/hooks/content/useMenubarOptions";
import useSubmenuOptions, {
  TSubmenuQueryObj,
} from "@/hooks/content/useSubmenuOptions";
import useWebpageOptions, {
  TWebpageQueryObj,
} from "@/hooks/content/useWebpageOptions";
import { useCreateSPSectionMutation } from "@/redux/api/content/singlePageSectionApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Grid from "@mui/material/Grid2";
import CMSelectStateInput from "@/components/forms/without_form_state_fields/CMSelectStateInput";
import CMStateInput from "@/components/forms/without_form_state_fields/CMStateInput";
import CMStateFileInput from "@/components/forms/without_form_state_fields/CMStateFileInput";
import Editor from "@/components/forms/editors/Editor";
import CMStateCheckbox from "@/components/forms/without_form_state_fields/CMStateCheckbox";
import { videoFileLimitation } from "@/utils/videoFileLimitation";
import CMStateTextarea from "@/components/forms/without_form_state_fields/CMStateTextarea";

type TSPSPayload = {
  webpageId: string;
  menubarId?: string;
  submenuId?: string;
  section_name: string;
  yt_video_url?: string;
  section_slug: string;
  files?: any;
  section_title?: string;
  section_summary?: string;
  section_contents?: string;
};

const CreateSinglePageSectionForm = () => {
  const router = useRouter();
  const menubarQueryObj: TMenubarQueryObj = {
    page: 1,
    limit: 50,
  };
  const submenuQueryObj: TSubmenuQueryObj = {
    page: 1,
    limit: 50,
  };
  const webpageQueryObj: TWebpageQueryObj = {
    page: 1,
    limit: 50,
    only_wp: "true",
  };
  const [hasWebpageParent, setHasWebpageParent] = useState(false);
  const [menubarId, setMenubarId] = useState("");
  const [submenuId, setSubmenuId] = useState("");
  const [webpageId, setWebpageId] = useState("");
  const [section_name, setSectionName] = useState();
  const [section_slug, setSectionSlug] = useState();
  const [yt_video_url, setYtVideoUrl] = useState();
  const [files, setFiles] = useState([]);
  const [section_title, setSectionTitle] = useState("");
  const [section_summary, setSectionSummary] = useState("");
  // Get value from text editor
  const [contents, setContents] = useState("");

  // options query assign
  if (!!menubarId) {
    webpageQueryObj["menubarId"] = menubarId;
    submenuQueryObj["menubarId"] = menubarId;
    delete webpageQueryObj["only_wp"];
  }
  if (!!submenuId) {
    webpageQueryObj["submenuId"] = submenuId;
    delete webpageQueryObj["only_wp"];
  }

  // get options
  const { options: menubar_options, isLoading: isMenubarLoading } =
    useMenubarOptions(menubarQueryObj);
  const { options: submenu_options, isLoading: isSubmenuLoading } =
    useSubmenuOptions(submenuQueryObj);
  const { options: webpage_options, isLoading: isWebpageLoading } =
    useWebpageOptions(webpageQueryObj);

  // create api
  const [createSPS, { isLoading: isCreateLoading }] =
    useCreateSPSectionMutation();

  // create function handler
  const submitHandler = async () => {
    const toastId = toast.loading("Please wait ...");
    if (!webpageId || !section_name || !section_slug) {
      toast.error("Data does not found!", { id: toastId, duration: 2000 });
    } else {
      const videoFileValidation = videoFileLimitation(files);
      if (!videoFileValidation?.status) {
        return toast.error(videoFileValidation?.message, {
          id: toastId,
          duration: 3000,
        });
      }
      const data: TSPSPayload = {
        webpageId: webpageId,
        section_name: section_name,
        section_slug: section_slug,
      };
      if (!!menubarId) {
        data["menubarId"] = menubarId;
      }
      if (!!submenuId) {
        data["submenuId"] = submenuId;
      }
      if (!!yt_video_url) {
        data["yt_video_url"] = yt_video_url;
      }
      if (files?.length > 0) {
        data["files"] = files;
      }
      if (section_title?.length > 0) {
        data["section_title"] = section_title;
      }
      if (section_summary?.length > 0) {
        data["section_summary"] = section_summary;
      }
      if (contents.length > 0) {
        data["section_contents"] = contents;
      }

      // console.log(data);

      const payload = modifyPayload(data);
      // console.log({ data, payload });

      try {
        const res = await createSPS(payload).unwrap();
        console.log(res);
        if (res?.success) {
          toast.success(res.message, { id: toastId, duration: 2000 });
          router.push("/dashboard/super_admin/content/page-section/single");
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
        {/* About, Submenu, Webpage, section name, section slug */}
        <Stack direction={{ xs: "column", lg: "row" }} gap={4}>
          {/* About, Submenu, Webpage */}
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
              <CMStateCheckbox
                name="has_webpage_parent"
                label="Has Webpage Parent?"
                setState={setHasWebpageParent}
                state={hasWebpageParent}
              />
            </Grid>

            <Grid size={12}>
              {hasWebpageParent && (
                <CMSelectStateInput
                  name="menubarId"
                  label="Menu"
                  setState={setMenubarId}
                  state={menubarId}
                  fullWidth={true}
                  items={menubar_options}
                  isDisabled={isMenubarLoading}
                />
              )}
            </Grid>

            <Grid size={12}>
              {hasWebpageParent && menubarId && submenu_options?.length > 0 && (
                <CMSelectStateInput
                  name="submenuId"
                  label="Submenu"
                  setState={setSubmenuId}
                  state={submenuId}
                  fullWidth={true}
                  items={submenu_options}
                  isDisabled={isSubmenuLoading}
                />
              )}
            </Grid>

            <Grid size={12}>
              <CMSelectStateInput
                name="webpageId"
                label="Webpage"
                setState={setWebpageId}
                state={webpageId}
                fullWidth={true}
                items={webpage_options}
                isDisabled={isWebpageLoading}
              />
            </Grid>

            <Grid size={12}>
              <CMStateInput
                name="section_name"
                label="Section Name"
                setState={setSectionName}
                fullWidth={true}
              />
            </Grid>

            <Grid size={12}>
              <CMStateInput
                name="section_slug"
                label="Section Slug"
                setState={setSectionSlug}
                fullWidth={true}
              />
            </Grid>
          </Grid>

          {/* Section name, Section Slug */}
          <Grid
            size={{ xs: 12, lg: 6 }}
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
                name="yt_video_url"
                label="Youtube Video URL (embedded)"
                setState={setYtVideoUrl}
                type="url"
                fullWidth={true}
              />
            </Grid>

            <Grid size={12}>
              <CMStateInput
                name="section_title"
                label="Section Title"
                setState={setSectionTitle}
                fullWidth={true}
              />
            </Grid>

            <Grid size={12}>
              <CMStateTextarea
                name="section_summery"
                label="Section Summary"
                setState={setSectionSummary}
              />
            </Grid>

            <Grid size={12}>
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
            <Editor setState={setContents} defaultValue={contents} />
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
          disabled={isCreateLoading}
          sx={{
            mt: "30px",
          }}
        >
          Create Section
        </Button>
      </Box>
    </>
  );
};

export default CreateSinglePageSectionForm;
