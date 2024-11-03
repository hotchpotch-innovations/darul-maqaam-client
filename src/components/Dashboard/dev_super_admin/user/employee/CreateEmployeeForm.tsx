"use client";

import CMForm from "@/components/forms/CMForm";
import { useCountryOptions } from "@/hooks/useCountryOptions";
import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";
import {
  TDesignationQueryObj,
  useDesignationOptions,
} from "@/hooks/useDesignationOptions";
import {
  TDivisionQueryObj,
  useDivisionOptions,
} from "@/hooks/useDivisionOptions";
import { useCreateEmployeeMutation } from "@/redux/api/user/userApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { create_employee_default_values } from "@/constants/values";
import { Button, Grid, Stack, Typography } from "@mui/material";
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
import {
  TDistrictQueryObj,
  useDistrictOptions,
} from "@/hooks/useDistrictOptions";

const validationSchema = z.object({
  password: z.string().min(6, "passrword must be at least 6 character"),
  employee: adminValidationSchema,
  present_address: present_addressValidationSchema,
  permanent_address: present_addressValidationSchema,
  social_links: social_linksValidationSchema,
});

const CreateEmployeeForm = () => {
  const desingnationQueryObj: TDesignationQueryObj = {};
  const presentDivisionQueryObj: TDivisionQueryObj = {};
  const permanentDivisionQueryObj: TDivisionQueryObj = {};
  const presentDistrictQueryObj: TDistrictQueryObj = {};
  const permanentDistrictQueryObj: TDistrictQueryObj = {};

  const [departmentId, setDepartmentId] = useState(null);
  //Present Address State
  const [presentCountryId, setPresentCountryId] = useState(null);
  const [presentDivisionId, setPresentDivisionId] = useState(null);

  //Permanent Address State
  const [permanentCountryId, setPermanentCountryId] = useState(null);
  const [permanentDivisionId, setPermanentDivisionId] = useState(null);

  // assign query value
  if (!!departmentId) {
    desingnationQueryObj["departmentId"] = departmentId;
  }
  if (!!presentCountryId) {
    presentDivisionQueryObj["countryId"] = presentCountryId;
  }
  if (!!permanentCountryId) {
    permanentDivisionQueryObj["countryId"] = permanentCountryId;
  }
  if (!!presentDivisionId) {
    presentDistrictQueryObj["divisionId"] = presentDivisionId;
  }
  if (!!permanentDivisionId) {
    permanentDistrictQueryObj["divisionId"] = permanentDivisionId;
  }

  //Create Options Here
  const [createEmployee] = useCreateEmployeeMutation();

  const { options: department_options } = useDepartmentOptions();
  const { options: designation_options } =
    useDesignationOptions(desingnationQueryObj);

  //set Present Address Query Parameter
  const {
    options: present_country_options,
    isLoading: present_country_isLoading,
  } = useCountryOptions();
  const {
    options: present_division_options,
    isLoading: present_division_isLoading,
  } = useDivisionOptions(presentDivisionQueryObj);
  const { options: present_district_options } = useDistrictOptions(
    presentDistrictQueryObj
  );

  // Set Permanent Address Query Parameter
  const {
    options: permanent_country_options,
    isLoading: permanent_country_isLoading,
  } = useCountryOptions();
  const {
    options: permanent_division_options,
    isLoading: permanent_division_isLoading,
  } = useDivisionOptions(permanentDivisionQueryObj);
  const { options: permanent_district_options } = useDistrictOptions(
    permanentDistrictQueryObj
  );

  // Create Employeee
  const handleCreateEmployee = async (values: FieldValues) => {
    console.log({ values });
    const toastId = toast.loading("Pleace wait...");
    const data = modifyPayload(values);
    try {
      const res = await createEmployee(data);
      console.log({ res });
      if (res.data.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.success("something went wrong", { id: toastId, duration: 3000 });
    }
  };
  return (
    <CMForm
      onSubmit={handleCreateEmployee}
      resolver={zodResolver(validationSchema)}
      defaultValues={create_employee_default_values}
    >
      <Stack direction={"row"} gap={4}>
        {/* 1st Pera */}
        <Grid
          item
          xs={3}
          md={6}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={4}
        >
          <Typography variant="h5">Departmental Information</Typography>
          <Grid item xs={12} md={12}>
            <CMSelectWithWatch
              name="employee.departmentId"
              label="Department *"
              options={department_options}
              setState={setDepartmentId}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMSelect
              name="employee.designationId"
              fullWidth={true}
              label="Designation *"
              items={designation_options}
              isDisabled={departmentId ? false : true}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMInput
              name="employee.web_mail"
              label="Web Gmail"
              size="small"
              fullWidth={true}
            />
          </Grid>{" "}
          <Grid item xs={12} md={12}>
            <CMInput
              name="employee.phone"
              label="Phone *"
              type="text"
              size="small"
              fullWidth={true}
            />
          </Grid>
        </Grid>

        {/* 2nd Pera */}
        <Grid
          item
          xs={3}
          md={6}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={4}
        >
          <Typography variant="h5">Basic Information</Typography>
          <Grid item xs={12} md={12}>
            <CMSelect
              name="employee.gender"
              fullWidth={true}
              label="Gender *"
              items={gender_options}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <CMInput
              name="employee.name"
              label="Name *"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMInput
              name="employee.email"
              label="Gmail *"
              type="email"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMInput
              name="password"
              label="Password *"
              type="password"
              size="small"
              fullWidth={true}
            />
          </Grid>
        </Grid>
      </Stack>

      <Stack direction={"row"} gap={4} mt={4}>
        <Grid
          item
          xs={3}
          md={4}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={2}
        >
          <Typography variant="h5">Present Address</Typography>
          <Grid item xs={12} md={12}>
            <CMSelectWithWatch
              name="present_address.countryId"
              label="Country *"
              options={present_country_options}
              setState={setPresentCountryId}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMSelectWithWatch
              name="present_address.divisionId"
              label="Division *"
              setState={setPresentDivisionId}
              options={present_division_options}
              isDisabled={
                presentCountryId || present_country_isLoading ? false : true
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMSelect
              name="present_address.districtId"
              fullWidth={true}
              label="District *"
              items={present_district_options}
              isDisabled={
                presentDivisionId || present_division_isLoading ? false : true
              }
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <CMInput
              name="present_address.address_line"
              label="Address Line *"
              size="small"
              fullWidth={true}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={3}
          md={4}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={2}
        >
          <Typography variant="h5">Permanent Address</Typography>
          <Grid item xs={12} md={12}>
            <CMSelectWithWatch
              name="permanent_address.countryId"
              label="Country *"
              options={permanent_country_options}
              setState={setPermanentCountryId}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMSelectWithWatch
              name="permanent_address.divisionId"
              label="Division *"
              setState={setPermanentDivisionId}
              options={permanent_division_options}
              isDisabled={
                permanentCountryId || permanent_country_isLoading ? false : true
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMSelect
              name="permanent_address.districtId"
              fullWidth={true}
              label="District *"
              items={permanent_district_options}
              isDisabled={
                permanentDivisionId || permanent_division_isLoading
                  ? false
                  : true
              }
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <CMInput
              name="permanent_address.address_line"
              label="Address Line *"
              size="small"
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
          item
          xs={3}
          md={4}
          container
          gap={2}
          sx={{
            border: "1px solid lightgray",
            boxShadow: 1,
          }}
          p={2}
        >
          <Typography variant="h5">Social Links</Typography>
          <Grid item xs={12} md={12}>
            <CMInput
              name="social_links.facebook"
              label="Facebook *"
              fullWidth={true}
            />
          </Grid>{" "}
          <Grid item xs={12} md={12}>
            <CMInput
              name="social_links.twitter"
              label="Twitter"
              size="small"
              fullWidth={true}
            />
          </Grid>{" "}
          <Grid item xs={12} md={12}>
            <CMInput
              name="social_links.linkedIn"
              label="LinkedIn"
              size="small"
              fullWidth={true}
            />
          </Grid>{" "}
          <Grid item xs={12} md={12}>
            <CMInput
              name="social_links.instagram"
              label="Instagram"
              size="small"
              fullWidth={true}
            />
          </Grid>
        </Grid>
      </Stack>
      <Button
        type="submit"
        fullWidth
        sx={{
          mt: "30px",
        }}
      >
        Create Employee
      </Button>
    </CMForm>
  );
};

export default CreateEmployeeForm;
