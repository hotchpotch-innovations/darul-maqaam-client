"use client";

import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useCreateMenuMutation } from "@/redux/api/content/menuApi";
import { useRouter } from "next/navigation";

const CreateMenuForm = () => {
  const router = useRouter();

  const default_values = {
    title: "",
    identifier: "",
  };

  const [createMenu] = useCreateMenuMutation();
  const handleCreateCountry = async (values: FieldValues) => {
    console.log(values);
    // const create_country_data = modifyPayload(values);
    const toastId = toast.loading("Please wait...");
    try {
      const res = await createMenu(values).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/dev_super_admin/content/menu");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { duration: 3000 });
    }
  };
  return (
    <CMForm onSubmit={handleCreateCountry} defaultValues={default_values}>
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
          <Typography variant="h5">Menu Information </Typography>

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
          >
            Create Menu
          </Button>
        </Box>
      </Stack>
    </CMForm>
  );
};

export default CreateMenuForm;
