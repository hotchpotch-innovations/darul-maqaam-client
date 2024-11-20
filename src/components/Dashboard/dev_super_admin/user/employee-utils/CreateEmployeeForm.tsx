"use client";

import CMForm from "@/components/forms/CMForm";
import { useCountryOptions } from "@/hooks/useCountryOptions";
import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";
import {
  TDesignationQueryObj,
  useDesignationOptions,
} from "@/hooks/useDesignationOptions";
// import {
//   TDivisionQueryObj,
//   useDivisionOptions,
// } from "@/hooks/useDivisionOptions";
import { useCreateEmployeeMutation } from "@/redux/api/user/userApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { create_employee_default_values } from "@/constants/values";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import CMSelect from "@/components/forms/CMSelect";
import CMInput from "@/components/forms/CMInput";
import { gender_options } from "@/constants/options";
import { z } from "zod";
import {
  adminValidationSchema,
  present_addressValidationSchema,
  social_linksValidationSchema,
} from "@/constants/zodvalidation";
import { useRouter } from "next/navigation";
import { customTimeOut } from "@/utils/customTimeOut";
// import {
//   TDistrictQueryObj,
//   useDistrictOptions,
// } from "@/hooks/useDistrictOptions";

const validationSchema = z.object({
  password: z.string().min(6, "passrword must be at least 6 character"),
  employee: adminValidationSchema,
  present_address: present_addressValidationSchema,
  permanent_address: present_addressValidationSchema,
  social_links: social_linksValidationSchema,
});

const CreateEmployeeForm = () => {
  const designationQueryObj: TDesignationQueryObj = {};
  const router = useRouter();
  // const presentDivisionQueryObj: TDivisionQueryObj = {};
  // const permanentDivisionQueryObj: TDivisionQueryObj = {};
  // const presentDistrictQueryObj: TDistrictQueryObj = {};
  // const permanentDistrictQueryObj: TDistrictQueryObj = {};

  const [departmentId, setDepartmentId] = useState(null);
  //Present Address State
  const [presentCountryId, setPresentCountryId] = useState(null);
  // const [presentDivisionId, setPresentDivisionId] = useState(null);

  // Permanent Address State
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

  //Create Options Here
  const [createEmployee] = useCreateEmployeeMutation();

  const { options: department_options } = useDepartmentOptions();
  const { options: designation_options } =
    useDesignationOptions(designationQueryObj);

  //set Present Address Query Parameter
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

  // Set Permanent Address Query Parameter
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

  // Create Employee
  const handleCreateEmployee: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");
    const data = modifyPayload(values);
    try {
      const res = await createEmployee(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/dev_super_admin/users/employee/manage");
      } else {
        console.log(res);
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message, { id: toastId, duration: 3000 });
      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };

  return (
    <CMForm
      onSubmit={handleCreateEmployee}
      resolver={zodResolver(validationSchema)}
      defaultValues={create_employee_default_values}
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
              name="employee.departmentId"
              label="Department *"
              size="medium"
              options={department_options}
              setState={setDepartmentId}
            />
          </Grid>
          <Grid size={12}>
            <CMSelect
              name="employee.designationId"
              fullWidth={true}
              label="Designation *"
              size="medium"
              items={designation_options}
              isDisabled={departmentId ? false : true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="employee.web_mail"
              label="Web Gmail"
              size="medium"
              fullWidth={true}
            />
          </Grid>{" "}
          <Grid size={12}>
            <CMInput
              name="employee.phone"
              label="Phone *"
              type="text"
              size="medium"
              fullWidth={true}
            />
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
          <Typography variant="h5">Basic Information</Typography>
          <Grid size={12}>
            <CMSelect
              name="employee.gender"
              fullWidth={true}
              label="Gender *"
              size="medium"
              items={gender_options}
            />
          </Grid>

          <Grid size={12}>
            <CMInput
              name="employee.name"
              label="Name *"
              size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="employee.email"
              label="Gmail *"
              type="email"
              size="medium"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="password"
              label="Password *"
              type="password"
              size="medium"
              fullWidth={true}
            />
          </Grid>
        </Grid>
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} gap={4} mt={4}>
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
        {/**
         * ======================================================
         *              Four pera
         * ========================================================
         */}
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
        >
          Create Employee
        </Button>
      </Box>
    </CMForm>
  );
};

export default CreateEmployeeForm;
