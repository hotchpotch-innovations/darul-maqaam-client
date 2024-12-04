"use client";
import { Box, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import CMStateFileInput from "@/components/forms/without_form_state_fields/CMStateFileInput";
import { useArticleAddFilesMutation } from "@/redux/api/content/articleApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { toast } from "sonner";
import { customTimeOut } from "@/utils/customTimeOut";
import CMForm from "@/components/forms/CMForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CMFileInput from "@/components/forms/CMFileInput";

type TProps = {
  id: string;
};
const ArticleImageSection2 = ({ id }: TProps) => {
  const [files, setFiles] = useState(null);

  // mutation add files
  const [addFiles] = useArticleAddFilesMutation();

  const addFileHandler: SubmitHandler<FieldValues> = async (values) => {
    // const values: { files?: any } = {};
    // if (!!files) {
    //   values["files"] = files;
    // }

    console.log(values);
    const article_file = modifyPayload(values);
    const payload = {
      id,
      data: article_file,
    };
    // console.log({ payload });
    const toastId = toast.loading("Please wait ...");
    try {
      const res = await addFiles(payload).unwrap();
      console.log({ res });
      if (res?.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      } else {
        toast.error(res?.message || "Something went wrong!", {
          id: toastId,
          duration: 2000,
        });
        console.log(res);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "something went wrong. please try again", {
        id: toastId,
        duration: 2000,
      });
      customTimeOut(3000).then(() => window.location.reload());
    }
  };

  return (
    <>
      <CMForm onSubmit={addFileHandler}>
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
            <Grid size={12}>
              <CMFileInput name="files" label="Files" multiple />
              {/* <CMStateFileInput
              name="files"
              label="Select Files"
              setState={setFiles}
              state={files}
              multiple={true}
              accept="image/*"
            /> */}
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
              // onClick={() => addFileHandler()}
              sx={{
                mt: "30px",
              }}
              disabled={false}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </CMForm>
    </>
  );
};

export default ArticleImageSection2;
