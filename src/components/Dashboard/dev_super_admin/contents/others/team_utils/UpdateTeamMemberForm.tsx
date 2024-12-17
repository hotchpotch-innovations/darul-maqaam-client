"use client";

import CMForm from "@/components/forms/CMForm";
import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";
import {
  TDesignationQueryObj,
  useDesignationOptions,
} from "@/hooks/useDesignationOptions";
import {
  useGetSingleTeamMemberQuery,
  useUpdateTeamMutation,
} from "@/redux/api/content/teamApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { filterUndefinedValues } from "@/utils/sanitizeObject";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import Grid from "@mui/material/Grid2";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import CMSelect from "@/components/forms/CMSelect";
import CMInput from "@/components/forms/CMInput";
import CMTextarea from "@/components/forms/CMTextarea";
import { z } from "zod";
import { social_linksValidationSchema } from "@/constants/zodvalidation";
import Loading from "@/components/UI/LoadingBar";

const validationSchema = z.object({
  departmentId: z.string().nonempty({ message: "Department is required" }),
  designationId: z.string().nonempty({ message: "Designation is required" }),
  name: z.string().nonempty({ message: "Name is required" }),
  description: z
    .string({ required_error: "Description is required" })
    .optional(),
  socialLink: social_linksValidationSchema,
});

type TProps = {
  id: string;
};

const UpdateTeamMemberForm = ({ id }: TProps) => {
  const router = useRouter();
  const [departmentId, setDepartmentId] = useState(null);

  const designationQueryObj: TDesignationQueryObj = {};

  // assign query value
  if (!!departmentId) {
    designationQueryObj["departmentId"] = departmentId;
  }

  const { options: department_options } = useDepartmentOptions();

  const { options: designation_options } =
    useDesignationOptions(designationQueryObj);

  // update api mutation
  const [updateMember, { isLoading: isUpdateLoading }] =
    useUpdateTeamMutation();

  // update handler
  const handleUpdateMember: SubmitHandler<FieldValues> = async (values) => {
    const { socialLink, ...formValue } = values;
    const member_data = filterUndefinedValues(formValue);
    const social_links = filterUndefinedValues(socialLink);
    member_data["social_links"] = social_links;

    const toastId = toast.loading("Please wait...", { duration: 3000 });

    try {
      const res = await updateMember({ id, ...member_data }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/dev_super_admin/content/others/team");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 3000 });
      console.log(error);
      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };

  const { data: team_obj, isLoading } = useGetSingleTeamMemberQuery(id);
  const team_data = team_obj?.data;

  if (isLoading) {
    return <Loading />;
  }

  const default_values = {
    departmentId: team_data?.department?.id,
    designationId: team_data?.designation?.id,
    name: team_data?.name,
    description: team_data?.description,
    socialLink: {
      facebook: team_data?.socialLink?.facebook,
      twitter: team_data?.socialLink?.twitter || "",
      linkedIn: team_data?.socialLink?.linkedIn || "",
      instagram: team_data?.socialLink?.instagram || "",
    },
  };

  return (
    <CMForm
      onSubmit={handleUpdateMember}
      resolver={zodResolver(validationSchema)}
      defaultValues={default_values}
    >
      <Stack direction={{ xs: "column", lg: "row" }} gap={4}>
        {/* 1st Pera */}
        <Grid
          size={{ xs: 12, lg: 6 }}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={4}
        >
          <Typography variant="h5">Departmental Information</Typography>
          <Grid size={12}>
            <CMSelectWithWatch
              name="departmentId"
              label="Department *"
              size="medium"
              options={department_options}
              setState={setDepartmentId}
            />
          </Grid>
          <Grid size={12}>
            <CMSelect
              name="designationId"
              fullWidth={true}
              label="Designation *"
              size="medium"
              items={designation_options}
              isDisabled={!departmentId}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="name"
              label="Name *"
              size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMTextarea name="description" label="Description" />
          </Grid>
        </Grid>

        {/* 2nd Pera */}
        <Grid
          size={{ xs: 12, lg: 6 }}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={4}
        >
          <Typography variant="h5">Social Links</Typography>
          <Grid size={12}>
            <CMInput
              name="socialLink.facebook"
              label="Facebook *"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="socialLink.twitter"
              label="Twitter"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="socialLink.linkedIn"
              label="LinkedIn"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="socialLink.instagram"
              label="Instagram"
              size="small"
              fullWidth={true}
            />
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
          Update Team Member
        </Button>
      </Box>
    </CMForm>
  );
};

export default UpdateTeamMemberForm;
