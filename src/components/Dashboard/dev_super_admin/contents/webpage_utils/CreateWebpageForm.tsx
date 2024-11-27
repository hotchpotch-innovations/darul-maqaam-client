"use client";
import CMCheckboxWithWatch from "@/components/forms/CMCheckboxWithWatch";
import CMFileInput from "@/components/forms/CMFileInput";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import CMSelect from "@/components/forms/CMSelect";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import CMTextarea from "@/components/forms/CMTextarea";
import { webpage_types_options } from "@/constants/options";
import { default_meta_info } from "@/constants/values";
import { useMenubarOptions } from "@/hooks/content/useMenubarOptions";
import useSubmenuOptions, {
  TSubmenuQueryObj,
} from "@/hooks/content/useSubmenuOptions";
import { useCreateWebpageMutation } from "@/redux/api/content/webpageApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
  page_type: z.string().nonempty("page_type is required"),
  menubarId: z.string().optional(),
  submenuId: z.string().optional(),
  title: z.string().nonempty("Webpage Title is required"),
  slug: z.string().nonempty("Slug is required"),
  identifier: z.string().nonempty("Identifier is required"),
  meta_title: z.string().nonempty("Meta Title is required"),
  og_author: z.string().nonempty("OG Author is required"),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
  file: z.instanceof(File).optional(), // Ensures `file` is a File object if provided
});

const default_values = {
  page_type: "",
  menubarId: undefined,
  submenuId: undefined,
  title: "",
  slug: "",
  identifier: "",
  meta_title: default_meta_info?.meta_title,
  og_author: "",
  meta_description: default_meta_info?.meta_description,
  meta_keywords: default_meta_info.meta_keywords,
  file: undefined,
};

const CreateWebpageForm = () => {
  const submenuQueryObj: TSubmenuQueryObj = {
    page: 1,
    limit: 20,
  };
  const router = useRouter();
  const [menubarId, setMenubarId] = useState("");
  const [hasMenu, setHasMenu] = useState();

  if (!!menubarId) {
    submenuQueryObj["menubarId"] = menubarId;
  }

  const { options: menubar_options, isLoading: isMenubarLoading } =
    useMenubarOptions();

  const { options: submenu_options, isLoading: isSubmenuOptions } =
    useSubmenuOptions(submenuQueryObj);

  const [createWebpage] = useCreateWebpageMutation();

  // Create handler for webpage
  const createHandler: SubmitHandler<FieldValues> = async (values) => {
    console.log(values);
    // const toastId = toast.loading("Please wait...", { duration: 3000 });
    // const data = modifyPayload(values);
    // try {
    //   const res = await createWebpage(data).unwrap();
    //   if (res?.success) {
    //     toast.success(res?.message, { id: toastId, duration: 3000 });
    //     router.push("/dashboard/dev_super_admin/content/webpage");
    //   } else {
    //     toast.error(res?.message, { id: toastId, duration: 3000 });
    //   }
    // } catch (error: any) {
    //   toast.error(error?.message, { id: toastId, duration: 3000 });
    //   console.log(error);
    //   customTimeOut(3000).then(() => window?.location?.reload());
    // }
  };

  return (
    <CMForm
      onSubmit={createHandler}
      resolver={zodResolver(validationSchema)}
      defaultValues={default_values}
    >
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

            {!!hasMenu && submenu_options.length > 0 && (
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
              <CMInput
                name="og_author"
                label="Open Graph Author"
                fullWidth={true}
              />
            </Grid>
            <Grid size={12}>
              <CMTextarea name="meta_description" label="Meta Description" />
            </Grid>
            <Grid size={12}>
              <CMTextarea name="meta_keywords" label="Meta Keywords" />
            </Grid>
            <Grid size={12}>
              <CMFileInput name="file" label="Open Graph Image" />
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
