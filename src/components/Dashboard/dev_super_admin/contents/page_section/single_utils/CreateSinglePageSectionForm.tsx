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
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Grid from "@mui/material/Grid2";
import CMSelectStateInput from "@/components/forms/without_form_state_fields/CMSelectStateInput";
import CMStateInput from "@/components/forms/without_form_state_fields/CMStateInput";
import CMStateFileInput from "@/components/forms/without_form_state_fields/CMStateFileInput";
import CMMultipleInput from "@/components/forms/multiple_fields/CMMultipleInput";
import CMMultipleTextarea from "@/components/forms/multiple_fields/CMMultipleTextarea";
import Editor from "@/components/forms/editors/Editor";
import CMStateCheckbox from "@/components/forms/without_form_state_fields/CMStateCheckbox";

type TSPSPayload = {
  webpageId: string;
  menubarId?: string;
  submenuId?: string;
  section_name: string;
  section_slug: string;
  files?: any;
  section_titles?: Array<string>;
  section_descriptions?: Array<string>;
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
  const [files, setFiles] = useState(null);
  const [section_titles, setSectionTitles] = useState([""]);
  const [section_descriptions, setSectionDescriptions] = useState([""]);
  const [section_contents, setSectionContents] = useState("");

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
      if (!!files) {
        data["files"] = files;
      }
      if (section_titles?.length > 0) {
        data["section_titles"] = section_titles;
      }
      if (section_descriptions?.length > 0) {
        data["section_descriptions"] = section_descriptions;
      }
      if (!!section_contents) {
        data["section_contents"] = section_contents;
      }

      //   console.log(data);

      const payload = modifyPayload(data);
      try {
        const res = await createSPS(payload).unwrap();

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
              <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
                <Grid size={{ xs: 3, md: 6 }}></Grid>
                <Grid size={{ xs: 3, md: 4 }}>
                  <CMStateCheckbox
                    name="has_webpage_parent"
                    label="Has Webpage Parent?"
                    setState={setHasWebpageParent}
                    state={hasWebpageParent}
                  />
                </Grid>
              </Stack>
            </Grid>

            {hasWebpageParent && (
              <Grid size={12}>
                <CMSelectStateInput
                  name="menubarId"
                  label="Menu"
                  setState={setMenubarId}
                  state={menubarId}
                  fullWidth={true}
                  items={menubar_options}
                  isDisabled={isMenubarLoading}
                />
              </Grid>
            )}

            {hasWebpageParent && menubarId && submenu_options?.length > 0 && (
              <Grid size={12}>
                <CMSelectStateInput
                  name="submenuId"
                  label="Submenu"
                  setState={setSubmenuId}
                  state={submenuId}
                  fullWidth={true}
                  items={submenu_options}
                  isDisabled={isSubmenuLoading}
                />
              </Grid>
            )}

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
            <Grid size={12}>
              <Stack direction={"row"} gap={2}>
                <Grid size={6}></Grid>
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
                name="section_titles"
                label="Section Titles"
                setState={setSectionTitles}
                states={section_titles}
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
                name="section_descriptions"
                label="Section Descriptions"
                setState={setSectionDescriptions}
                states={section_descriptions}
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

      <Button
        onClick={() => submitHandler()}
        type="submit"
        fullWidth
        sx={{
          mt: "30px",
        }}
        disabled={isCreateLoading}
      >
        Create Section
      </Button>
    </>
  );
};

export default CreateSinglePageSectionForm;
