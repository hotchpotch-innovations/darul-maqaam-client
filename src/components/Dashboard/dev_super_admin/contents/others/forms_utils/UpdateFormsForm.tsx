"use client";
import CMForm from "@/components/forms/CMForm";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import CMSelect from "@/components/forms/CMSelect";
import CMInput from "@/components/forms/CMInput";
import CMTextarea from "@/components/forms/CMTextarea";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useGetSingleFormQuery,
  useUpdateFormsMutation,
} from "@/redux/api/content/formsApi";
import {
  TCategoryQueryObj,
  useCategoryOptions,
} from "@/hooks/content/useCategoryOptions";
import {
  TAuthorityQueryObj,
  useAuthorityOptions,
} from "@/hooks/content/useAuthorityOptions";
import { formsAndTemplateTypeValue } from "@/constants/values";
import Loading from "@/components/ui/LoadingBar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { customTimeOut } from "@/utils/customTimeOut";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const zodValidations = z.object({
  categoryId: z.string().nonempty({ message: "Category is required" }),
  authorityId: z.string().nonempty({ message: "Authority is required" }),
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
});

type TProps = {
  id: string;
};
const UpdateFormsForm = ({ id }: TProps) => {
  const router = useRouter();
  const categoryQueryObj: TCategoryQueryObj = {
    type: formsAndTemplateTypeValue,
    limit: 20,
    page: 1,
  };
  const authorityQueryObj: TAuthorityQueryObj = {
    limit: 20,
    page: 1,
  };
  const { data: forms_obj, isLoading } = useGetSingleFormQuery(id);
  const forms_data = forms_obj?.data;

  const default_values = {
    categoryId: forms_data?.categoryId,
    authorityId: forms_data?.authorityId,
    title: forms_data?.title,
    description: forms_data?.description,
  };

  // options
  const { options: category_options, isLoading: isCategoryLoading } =
    useCategoryOptions(categoryQueryObj);

  const { options: authority_options, isLoading: isAuthorityLoading } =
    useAuthorityOptions(authorityQueryObj);

  // update mutation
  const [updateForm, { isLoading: isUpdateLoading }] = useUpdateFormsMutation();

  const handleUpdateMember: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await updateForm({ id, ...values }).unwrap();

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <CMForm
      onSubmit={handleUpdateMember}
      resolver={zodResolver(zodValidations)}
      defaultValues={default_values}
    >
      <Stack direction={{ xs: "column", lg: "row" }} gap={4}>
        {/* 1st Pera */}
        <Grid
          size={{ xs: 12, lg: 12 }}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={4}
        >
          <Grid size={12}>
            <CMSelect
              name="categoryId"
              fullWidth={true}
              label="Category *"
              size="medium"
              items={category_options}
            />
          </Grid>
          <Grid size={12}>
            <CMSelect
              name="authorityId"
              fullWidth={true}
              label="Authority *"
              size="medium"
              items={authority_options}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="title"
              label="Title *"
              size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMTextarea name="description" label="Description" />
          </Grid>
        </Grid>
      </Stack>
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
          disabled={isUpdateLoading}
        >
          Update Forms
        </Button>
      </Box>
    </CMForm>
  );
};

export default UpdateFormsForm;
