"use client";
import CMCheckboxWithWatch from "@/components/forms/CMCheckboxWithWatch";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import CMSelect from "@/components/forms/CMSelect";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import CMTextarea from "@/components/forms/CMTextarea";
import CMStateFileInput from "@/components/forms/without_form_state_fields/CMStateFileInput";
import { webpage_types_options } from "@/constants/options";
import { useMenubarOptions } from "@/hooks/content/useMenubarOptions";
import useSubmenuOptions, {
  TSubmenuQueryObj,
} from "@/hooks/content/useSubmenuOptions";
import { Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const default_values = {
  page_type: "",
};

const CreateWebpageForm = () => {
  const submenuQueryObj: TSubmenuQueryObj = {
    page: 1,
    limit: 20,
  };
  const [file, setFile] = useState("");
  const [menubarId, setMenubarId] = useState("");
  const [hasMenu, setHasMenu] = useState();

  if (!!menubarId) {
    submenuQueryObj["menubarId"] = menubarId;
  }

  const { options: menubar_options, isLoading: isMenubarLoading } =
    useMenubarOptions();

  const { options: submenu_options, isLoading: isSubmenuOptions } =
    useSubmenuOptions(submenuQueryObj);

  // Create handler for webpage
  const createHandler: SubmitHandler<FieldValues> = (values) => {
    console.log(values);
  };
  return (
    <CMForm onSubmit={createHandler} defaultValues={default_values}>
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
                <Grid size={{ xs: 3, md: 6 }}>
                  <CMSelect
                    name="page_type"
                    label="Type"
                    size="medium"
                    items={webpage_types_options}
                  />
                </Grid>
                <Grid size={{ xs: 3, md: 3 }}>
                  <CMCheckboxWithWatch
                    name="has_menubar"
                    label="Has Menu?"
                    onValueChange={setHasMenu}
                  />
                </Grid>
              </Stack>
            </Grid>
            {!!hasMenu && (
              <Grid size={12}>
                <CMSelectWithWatch
                  name="menubarId"
                  label="Menu"
                  size="medium"
                  options={menubar_options}
                  setState={setMenubarId}
                />
              </Grid>
            )}

            {submenu_options.length > 0 && (
              <Grid size={12}>
                <CMSelect
                  name="submenuId"
                  label="Submenu"
                  size="medium"
                  items={submenu_options}
                  isDisabled={isMenubarLoading}
                />
              </Grid>
            )}

            <Grid size={12}>
              <CMInput
                name="title"
                label="Webpage Title"
                size="medium"
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMInput
                name="identifier"
                label="Webpage Identifier"
                size="medium"
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMInput name="slug" label="Webpage Slug" fullWidth={true} />
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
              <CMInput
                name="meta_title"
                label="Meta Title"
                size="medium"
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMInput name="og_author" label="Meta Title" fullWidth={true} />
            </Grid>
            <Grid size={12}>
              <CMTextarea name="meta_description" label="Meta Description" />
            </Grid>
            <Grid size={12}>
              <CMTextarea name="meta_keywords" label="Meta Keywords" />
            </Grid>
            <Grid size={12}>
              <CMStateFileInput
                name="file"
                accept="image/*"
                label="Open Graph Image"
                setState={setFile}
                state={file}
              />
            </Grid>
          </Grid>
        </Stack>
      </Stack>

      <Button
        type="submit"
        fullWidth
        sx={{
          mt: "30px",
        }}
      >
        Create Webpage
      </Button>
    </CMForm>
  );
};

export default CreateWebpageForm;
