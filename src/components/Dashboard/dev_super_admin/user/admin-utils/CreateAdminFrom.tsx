"use client";

import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import CMSelect from "@/components/forms/CMSelect";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import CMPasswordInput from "@/components/forms/without_form_state_fields/CMPasswordInput";
// import CMSelect from "@/components/forms/CMSelect";
// import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import { gender_options } from "@/constants/options";
import { create_admin_default_values } from "@/constants/values";
import {
  adminValidationSchema,
  addressValidationSchema,
  social_linksValidationSchema,
} from "@/constants/zodvalidation";
import { useCountryOptions } from "@/hooks/useCountryOptions";
import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";
import {
  TDesignationQueryObj,
  useDesignationOptions,
} from "@/hooks/useDesignationOptions";
// import {
//   TDistrictQueryObj,
//   useDistrictOptions,
// } from "@/hooks/useDistrictOptions";
// import {
//   TDivisionQueryObj,
//   useDivisionOptions,
// } from "@/hooks/useDivisionOptions";
import { useCreateAdminMutation } from "@/redux/api/user/userApi";
import { customTimeOut } from "@/utils/customTimeOut";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
  password: z.string().min(6, "password must be at least 6 character"),
  admin: adminValidationSchema,
  present_address: addressValidationSchema,
  permanent_address: addressValidationSchema,
  social_links: social_linksValidationSchema,
});

const CreateAdminFrom = () => {
  const router = useRouter();

  const designationQueryObj: TDesignationQueryObj = {};
  // const presentDivisionQueryObj: TDivisionQueryObj = {};
  // const permanentDivisionQueryObj: TDivisionQueryObj = {};
  // const presentDistrictQueryObj: TDistrictQueryObj = {};
  // const permanentDistrictQueryObj: TDistrictQueryObj = {};

  const [departmentId, setDepartmentId] = useState(null);
  // present address state
  const [presentCountryId, setPresentCountryId] = useState(null);
  // const [presentDivisionId, setPresentDivisionId] = useState(null);

  // permanent address state
  const [permanentCountryId, setPermanentCountryId] = useState(null);
  // const [permanentDivisionId, setPermanentDivisionId] = useState(null);

  // assign query value
  if (!!departmentId) {
    designationQueryObj["departmentId"] = departmentId;
  }
  // if (!!presentCountryId) {
  //   presentDivisionQueryObj["countryId"] = presentCountryId;
  // }
  // if (!!permanentCountryId) {
  //   permanentDivisionQueryObj["countryId"] = permanentCountryId;
  // }
  // if (!!presentDivisionId) {
  //   presentDistrictQueryObj["divisionId"] = presentDivisionId;
  // }
  // if (!!permanentDivisionId) {
  //   permanentDistrictQueryObj["divisionId"] = permanentDivisionId;
  // }

  const [createAdmin, { isLoading: isCreateLoading }] =
    useCreateAdminMutation();

  const { options: department_options } = useDepartmentOptions();
  const { options: designation_options } =
    useDesignationOptions(designationQueryObj);

  //Present Information
  const {
    options: present_country_options,
    // isLoading: present_country_isLoading,
  } = useCountryOptions();

  // const {
  //   options: present_division_options,
  //   isLoading: present_division_isLoading,
  // } = useDivisionOptions(presentDivisionQueryObj);

  // const { options: present_district_options } = useDistrictOptions(
  //   presentDistrictQueryObj
  // );

  // Permanent Information
  const {
    options: permanent_country_options,
    // isLoading: permanent_country_isLoading,
  } = useCountryOptions();

  // const {
  //   options: permanent_division_options,
  //   isLoading: permanent_division_isLoading,
  // } = useDivisionOptions(permanentDivisionQueryObj);

  // const { options: permanent_district_options } = useDistrictOptions(
  //   permanentDistrictQueryObj
  // );

  const handleCreateAdmin: SubmitHandler<FieldValues> = async (values) => {
    // console.log({ removeNullValue });
    const toastId = toast.loading("Please wait...", { duration: 3000 });
    const data = modifyPayload(values);
    try {
      const res = await createAdmin(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/dev_super_admin/users/admin/manage");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 3000 });
      console.log(error);
      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };

  return (
    <CMForm
      onSubmit={handleCreateAdmin}
      resolver={zodResolver(validationSchema)}
      defaultValues={create_admin_default_values}
    >
      <Stack direction={{ xs: "column", lg: "row" }} gap={4}>
        {/* Departmental Information */}
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
              name="admin.departmentId"
              label="Department *"
              size="medium"
              options={department_options}
              setState={setDepartmentId}
            />
          </Grid>
          <Grid size={12}>
            <CMSelect
              name="admin.designationId"
              fullWidth={true}
              label="Designation *"
              size="medium"
              items={designation_options}
              isDisabled={departmentId ? false : true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="admin.web_mail"
              label="Web Gmail"
              size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="admin.phone"
              label="Phone *"
              type="text"
              size="medium"
              fullWidth={true}
            />
          </Grid>
        </Grid>

        {/* Basic Information */}
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
          <Typography variant="h5">Basic Information</Typography>
          <Grid size={12}>
            <CMSelect
              name="admin.gender"
              fullWidth={true}
              label="Gender *"
              size="medium"
              items={gender_options}
            />
          </Grid>

          <Grid size={12}>
            <CMInput
              name="admin.name"
              label="Name *"
              size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="admin.email"
              label="Gmail *"
              type="email"
              size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMPasswordInput
              name="password"
              label="Password"
              required={true}
              size="medium"
              fullWidth={true}
            />
          </Grid>
        </Grid>
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} gap={4} mt={4}>
        {/* Present Address */}
        <Grid
          size={{ xs: 12, lg: 4 }}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={2}
        >
          <Typography variant="h5">Present Address</Typography>
          <Grid size={12}>
            <CMSelectWithWatch
              name="present_address.countryId"
              label="Country *"
              size="medium"
              options={present_country_options}
              setState={setPresentCountryId}
            />
          </Grid>
          <Grid size={12}>
            {/* <CMSelectWithWatch
              name="present_address.divisionId"
              label="Division *"
              setState={setPresentDivisionId}
              options={present_division_options}
              isDisabled={
                presentCountryId || present_country_isLoading ? false : true
              }
            /> */}
            <CMInput
              name="present_address.state"
              label="State *"
              size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            {/* <CMSelect
              name="present_address.districtId"
              fullWidth={true}
              label="District *"
              items={present_district_options}
              isDisabled={
                presentDivisionId || present_division_isLoading ? false : true
              }
            /> */}
            <CMInput
              name="present_address.city"
              label="City *"
              size="medium"
              fullWidth={true}
            />
          </Grid>

          <Grid size={12}>
            <CMInput
              name="present_address.address_line"
              label="Address Line *"
              size="medium"
              fullWidth={true}
            />
          </Grid>
        </Grid>

        {/* Permanent Address */}
        <Grid
          size={{ xs: 12, lg: 4 }}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={2}
        >
          <Typography variant="h5">Permanent Address</Typography>
          <Grid size={12}>
            <CMSelectWithWatch
              name="permanent_address.countryId"
              label="Country *"
              size="medium"
              options={permanent_country_options}
              setState={setPermanentCountryId}
            />
          </Grid>
          <Grid size={12}>
            {/* <CMSelectWithWatch
              name="permanent_address.divisionId"
              label="Division *"
              setState={setPermanentDivisionId}
              options={permanent_division_options}
              isDisabled={
                permanentCountryId || permanent_country_isLoading ? false : true
              }
            /> */}
            <CMInput
              name="permanent_address.state"
              label="State *"
              size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            {/* <CMSelect
              name="permanent_address.districtId"
              fullWidth={true}
              label="District *"
              items={permanent_district_options}
              isDisabled={
                permanentDivisionId || permanent_division_isLoading
                  ? false
                  : true
              }
            /> */}
            <CMInput
              name="permanent_address.city"
              label="City *"
              size="medium"
              fullWidth={true}
            />
          </Grid>

          <Grid size={12}>
            <CMInput
              name="permanent_address.address_line"
              label="Address Line *"
              size="medium"
              fullWidth={true}
            />
          </Grid>
        </Grid>

        {/* Social Links */}
        <Grid
          size={{ xs: 12, lg: 4 }}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={2}
        >
          <Typography variant="h5">Social Links</Typography>
          <Grid size={12}>
            <CMInput
              name="social_links.facebook"
              label="Facebook *"
              size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="social_links.twitter"
              label="Twitter"
              size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="social_links.linkedIn"
              label="LinkedIn"
              size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="social_links.instagram"
              label="Instagram"
              size="medium"
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
          disabled={isCreateLoading}
        >
          Create Admin
        </Button>
      </Box>
    </CMForm>
  );
};

export default CreateAdminFrom;
