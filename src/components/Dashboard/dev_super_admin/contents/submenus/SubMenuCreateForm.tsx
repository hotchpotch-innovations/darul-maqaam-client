"use client";

import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateSubmenuMutation } from "@/redux/api/content/submenuApi";
import CMSelect from "@/components/forms/CMSelect";
import { useMenubarOptions } from "@/hooks/content/useMenubarOptions";

const CreateSubMenuForm = () => {
  const router = useRouter();

  const default_values = {
    menubarId: "",
    title: "",
    identifier: "",
  };

  const { options: menubar_options } = useMenubarOptions();
  const [createSubmenu] = useCreateSubmenuMutation();
  const handleCreateSubmenu = async (values: FieldValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await createSubmenu(values).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/dev_super_admin/content/submenu");
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
    <CMForm onSubmit={handleCreateSubmenu} defaultValues={default_values}>
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
            <CMSelect
              name="menubarId"
              label="Menubar"
              items={menubar_options}
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput name="title" label="Title" fullWidth={true} />
          </Grid>
          <Grid size={12}>
            <CMInput name="identifier" label="Identifier" fullWidth={true} />
          </Grid>
        </Grid>

        <Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button type="submit">Create Submenu</Button>
          </Box>
        </Stack>
      </Stack>
    </CMForm>
  );
};

export default CreateSubMenuForm;
