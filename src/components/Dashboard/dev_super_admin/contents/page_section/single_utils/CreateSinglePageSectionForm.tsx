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
import CMStateFileInput from "@/components/forms/without_form_state_fields/CMStateFileInput";
import Editor from "@/components/forms/editors/Editor";
import CMStateCheckbox from "@/components/forms/without_form_state_fields/CMStateCheckbox";
import { videoFileLimitation } from "@/utils/videoFileLimitation";
import { z } from "zod";
import CMForm from "@/components/forms/CMForm";
import { create_single_wp_section_default_values } from "@/constants/values";
import { zodResolver } from "@hookform/resolvers/zod";
import CMSelect from "@/components/forms/CMSelect";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import CMInput from "@/components/forms/CMInput";
import CMTextarea from "@/components/forms/CMTextarea";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { filterUndefinedValues } from "@/utils/sanitizeObject";

const validationSchema = z.object({
  webpageId: z.string().nonempty({ message: "Webpage is required" }),
  menubarId: z.string().optional(),
  submenuId: z.string().optional(),
  section_name: z.string().nonempty({ message: "Section name is required" }),
  yt_video_url: z.string().optional(),
  section_slug: z.string().nonempty({ message: "Section slug is required" }),
  section_title: z.string().optional(),
  section_summary: z.string().optional(),
});

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
  const [menubarId, setMenubarId] = useState(null);
  const [submenuId, setSubmenuId] = useState(null);
  const [files, setFiles] = useState([]);
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

    if (!!contents) {
      data["section_contents"] = contents;
    }

    const payload = modifyPayload(data);

    try {
      const res = await createSPS(payload).unwrap();
      console.log(res);
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
  return (
    <>
      <CMForm
        onSubmit={submitHandler}
        defaultValues={create_single_wp_section_default_values}
        resolver={zodResolver(validationSchema)}
      >
        <Stack direction={"column"} spacing={4}>
          <Stack direction={{ xs: "column", lg: "row" }} gap={4}>
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
                  <CMSelectWithWatch
                    name="menubarId"
                    label="Menu"
                    options={menubar_options}
                    setState={setMenubarId}
                    isDisabled={isMenubarLoading}
                  />
                )}
              </Grid>

              <Grid size={12}>
                {hasWebpageParent &&
                  menubarId &&
                  submenu_options?.length > 0 && (
                    <CMSelectWithWatch
                      name="submenuId"
                      label="Submenu"
                      options={submenu_options}
                      setState={setSubmenuId}
                      isDisabled={isSubmenuLoading}
                    />
                  )}
              </Grid>

              <Grid size={12}>
                <CMSelect
                  name="webpageId"
                  label="Webpage"
                  fullWidth={true}
                  items={webpage_options}
                  isDisabled={isWebpageLoading}
                />
              </Grid>

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
            </Grid>

            {/* Section name, Section Slug */}
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
                <CMInput
                  name="yt_video_url"
                  label="Youtube Video URL (embedded)"
                  type="url"
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
            disabled={isCreateLoading}
            sx={{
              mt: "30px",
            }}
          >
            Create Section
          </Button>
        </Box>
      </CMForm>
    </>
  );
};

export default CreateSinglePageSectionForm;
