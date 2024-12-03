"use client";

import CMForm from "@/components/forms/CMForm";
import { useCreateFormsMutation } from "@/redux/api/content/formsApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Grid from "@mui/material/Grid2";
import CMSelect from "@/components/forms/CMSelect";
import CMInput from "@/components/forms/CMInput";
import { formsAndTemplateTypeValue } from "@/constants/values";
import {
  TCategoryQueryObj,
  useCategoryOptions,
} from "@/hooks/content/useCategoryOptions";
import {
  TAuthorityQueryObj,
  useAuthorityOptions,
} from "@/hooks/content/useAuthorityOptions";
import CMTextarea from "@/components/forms/CMTextarea";
import CMFileInput from "@/components/forms/CMFileInput";
import { modifyPayload } from "@/utils/modifyPayload";

const validationSchema = z.object({
  categoryId: z.string().nonempty({ message: "Category is required" }),
  authorityId: z.string().nonempty({ message: "Authority is required" }),
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().nonempty({ message: "Identifier is required" }),
  file: z.instanceof(File).optional(),
});

const CreateFormsForm = () => {
  const categoryQueryObj: TCategoryQueryObj = {
    type: formsAndTemplateTypeValue,
    limit: 20,
    page: 1,
  };
  const authorityQueryObj: TAuthorityQueryObj = {
    limit: 20,
    page: 1,
  };
  const router = useRouter();
  const default_values = {
    categoryId: "",
    authorityId: "",
    title: "",
    description: "",
  };

  const { options: category_options, isLoading: isCategoryLoading } =
    useCategoryOptions(categoryQueryObj);

  const { options: authority_options, isLoading: isAuthorityLoading } =
    useAuthorityOptions(authorityQueryObj);

  const [createFT, { isLoading }] = useCreateFormsMutation();

  const createHandler: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");
    const pdf_file = values?.file;
    if (!pdf_file) {
      toast.error("File is required!", { duration: 3000 });
    }
    const payload = modifyPayload(values);
    try {
      const res = await createFT(payload).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/dev_super_admin/content/others/forms");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { duration: 3000 });
      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };
  return (
    <CMForm
      onSubmit={createHandler}
      resolver={zodResolver(validationSchema)}
      defaultValues={default_values}
    >
      <Stack justifyContent="center" gap={4}>
        <Grid
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={4}
        >
          <Typography variant="h5">Forms & Templates Information </Typography>
          <Grid size={12}>
            <CMSelect
              name="categoryId"
              label="Category"
              size="medium"
              fullWidth={true}
              items={category_options}
              isDisabled={isCategoryLoading}
            />
          </Grid>
          <Grid size={12}>
            <CMSelect
              name="authorityId"
              label="Authority"
              size="medium"
              fullWidth={true}
              items={authority_options}
              isDisabled={isAuthorityLoading}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="title"
              size="medium"
              label="Title"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMFileInput
              name="file"
              label="File (PDF)"
              accept="application/pdf"
            />
          </Grid>
          <Grid size={12}>
            <CMTextarea name="description" label="Description" />
          </Grid>
        </Grid>
      </Stack>

      <Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="submit"
            sx={{
              mt: "30px",
            }}
            disabled={isLoading}
          >
            Create Authority
          </Button>
        </Box>
      </Stack>
    </CMForm>
  );
};

export default CreateFormsForm;
