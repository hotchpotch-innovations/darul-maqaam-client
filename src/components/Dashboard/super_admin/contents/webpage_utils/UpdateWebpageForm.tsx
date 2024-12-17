"use client";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import CMTextarea from "@/components/forms/CMTextarea";
import Loading from "@/components/UI/LoadingBar";
import { default_meta_info } from "@/constants/values";
import {
  useGetSingleWebpageQuery,
  useUpdateWebpageMutation,
} from "@/redux/api/content/webpageApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { filterUndefinedValues } from "@/utils/sanitizeObject";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TProps = {
  slug: string;
};

const validationSchema = z.object({
  title: z.string().nonempty("Webpage Title is required"),
  meta_title: z.string().nonempty("Meta Title is required"),
  og_author: z.string().nonempty("OG Author is required"),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
});

const UpdateWebpageForm = ({ slug }: TProps) => {
  const router = useRouter();
  const [id, setId] = useState();

  const { data: webpage_obj, isLoading } = useGetSingleWebpageQuery(slug);

  const webpage_info = webpage_obj?.data;

  useEffect(() => {
    setId(webpage_info?.id);
  }, [webpage_info]);

  const [updateWebpage] = useUpdateWebpageMutation();

  // Create handler for webpage
  const updateHandler: SubmitHandler<FieldValues> = async (values) => {
    const data = filterUndefinedValues({ ...values });
    const toastId = toast.loading("Please wait...", { duration: 3000 });
    try {
      const res = await updateWebpage({ id, ...data }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/super_admin/content/web-page");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 3000 });
      console.log(error);
      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };

  if (!!isLoading) {
    return <Loading />;
  }

  const default_values = {
    title: webpage_info?.title,
    // slug: webpage_info?.slug,
    meta_title: webpage_info?.meta_title || default_meta_info?.meta_title,
    og_author: webpage_info?.og_author || default_meta_info?.og_author,
    meta_description:
      webpage_info?.meta_description || default_meta_info?.meta_description,
    meta_keywords:
      webpage_info?.meta_keywords || default_meta_info?.meta_keywords,
  };

  return (
    <CMForm
      onSubmit={updateHandler}
      resolver={zodResolver(validationSchema)}
      defaultValues={default_values}
    >
      <Box sx={{ p: 2 }}>
        <Grid container spacing={6}>
          <Grid container spacing={2} size={{ xs: 12, lg: 6 }}>
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
                size="medium"
                fullWidth={true}
              />
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Grid size={12}>
              <CMTextarea name="meta_description" label="Meta Description" />
            </Grid>
            <Grid size={12}>
              <CMTextarea name="meta_keywords" label="Meta Keywords" />
            </Grid>
          </Grid>
        </Grid>

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
            Update Webpage
          </Button>
        </Box>
      </Box>
    </CMForm>
  );
};

export default UpdateWebpageForm;
