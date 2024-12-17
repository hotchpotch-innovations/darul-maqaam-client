"use client";

import CMForm from "@/components/forms/CMForm";
import { useCreateCommonCategoryMutation } from "@/redux/api/content/commonCategoryApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Grid from "@mui/material/Grid2";
import CMInput from "@/components/forms/CMInput";
import CMSelect from "@/components/forms/CMSelect";
import { common_category_types_options } from "@/constants/options";

const validationSchema = z.object({
  type: z.string().nonempty({ message: "Type is required" }),
  title: z.string().nonempty({ message: "Title is required" }),
  identifier: z.string().nonempty({ message: "Identifier is required" }),
});

const CreateCommonCategoryForm = () => {
  const router = useRouter();
  const default_values = {
    type: "",
    title: "",
    identifier: "",
  };

  const [createCategory, { isLoading }] = useCreateCommonCategoryMutation();

  const createHandler: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await createCategory(values).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/super_admin/content/settings/category");
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
          <Typography variant="h5">Category Information </Typography>

          <Grid size={12}>
            <CMSelect
              name="type"
              label="Type"
              fullWidth={true}
              items={common_category_types_options}
            />
          </Grid>
          <Grid size={12}>
            <CMInput name="title" label="Title" fullWidth={true} />
          </Grid>
          <Grid size={12}>
            <CMInput name="identifier" label="Identifier" fullWidth={true} />
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
            Create Category
          </Button>
        </Box>
      </Stack>
    </CMForm>
  );
};

export default CreateCommonCategoryForm;
