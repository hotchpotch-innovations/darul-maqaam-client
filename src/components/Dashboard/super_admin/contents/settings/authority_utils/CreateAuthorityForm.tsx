"use client";

import CMForm from "@/components/forms/CMForm";
import { useCreateAuthorityMutation } from "@/redux/api/content/authorityApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Grid from "@mui/material/Grid2";
import CMInput from "@/components/forms/CMInput";

const validationSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  identifier: z.string().nonempty({ message: "Identifier is required" }),
});

const CreateAuthorityForm = () => {
  const router = useRouter();
  const default_values = {
    title: "",
    identifier: "",
  };

  const [createAuthority, { isLoading }] = useCreateAuthorityMutation();

  const createHandler: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await createAuthority(values).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/super_admin/content/settings/authority");
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
          <Typography variant="h5">Authority Information </Typography>
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
            Create Authority
          </Button>
        </Box>
      </Stack>
    </CMForm>
  );
};

export default CreateAuthorityForm;
