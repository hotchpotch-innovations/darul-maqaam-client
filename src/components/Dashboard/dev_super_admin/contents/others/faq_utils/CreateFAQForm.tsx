"use client";

import CMForm from "@/components/forms/CMForm";
import { useCreateFaqMutation } from "@/redux/api/content/faqApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import Grid from "@mui/material/Grid2";
import CMInput from "@/components/forms/CMInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
  question: z.string().nonempty({ message: "Question is required" }),
  answer: z.string().nonempty({ message: "Answer is required" }),
});

const CreateFAQForm = () => {
  const router = useRouter();

  const default_values = {
    question: "",
    answer: "",
  };

  const [createFaq, { isLoading }] = useCreateFaqMutation();

  const createHandler: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await createFaq(values).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/dev_super_admin/content/others/faq");
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
          <Typography variant="h5">FAQ Information </Typography>

          <Grid size={12}>
            <CMInput name="question" label="Question" fullWidth={true} />
          </Grid>
          <Grid size={12}>
            <CMInput name="answer" label="Answer" fullWidth={true} />
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
            Create FAQ
          </Button>
        </Box>
      </Stack>
    </CMForm>
  );
};

export default CreateFAQForm;
