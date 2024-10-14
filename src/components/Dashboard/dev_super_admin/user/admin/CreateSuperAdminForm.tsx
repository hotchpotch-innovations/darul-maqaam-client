"use client";

import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import CMSelect from "@/components/forms/CMSelect";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import { gender_options } from "@/constants/options";
import { create_admin_default_values } from "@/constants/values";
import {
  adminValidationSchema,
  present_addressValidationSchema,
  social_linksValidationSchema,
} from "@/constants/zodvalidation";
import { useCountryOptions } from "@/hooks/useCountryOptions";
import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";
import { useDesignationOptions } from "@/hooks/useDesignationOptions";
import { useDivisionOptions } from "@/hooks/useDivisionOptions";
import { usePermanentCountryOptions } from "@/hooks/usePermanentCountryOptions";
import { usePermanentDistrictOptions } from "@/hooks/usePermanentDistrictOptions";
import { usePermanentDivisionOptions } from "@/hooks/usePermanentDivisionOptions";
import { usePresentDistrictOptions } from "@/hooks/usePresentDistrictOptions";
import { useCreateSuperAdminMutation } from "@/redux/api/user/userApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const validationSchema = z.object({
  password: z.string().min(6, "passrword must be at least 6 character"),
  admin: adminValidationSchema,
  present_address: present_addressValidationSchema,
  permanent_address: present_addressValidationSchema,
  social_links: social_linksValidationSchema,
});

const CreateSuperAdminForm = () => {
  const [departmentId, setDepartmentId] = useState(null);
  const [presentCountryId, setPresentCountryId] = useState(null);

  const [presentDivisionId, setPresentDivisionId] = useState(null);
  console.log(presentDivisionId);

  const [permanentCountryId, setPermanentCountryId] = useState(null);
  const [permanentDivisionId, setPermanentDivisionId] = useState(null);

  const [createSuperAdmin] = useCreateSuperAdminMutation();

  const { options: department_options } = useDepartmentOptions();
  const { options: designation_options } = useDesignationOptions(departmentId);
  const {
    options: present_country_options,
    isLoading: present_country_isLoading,
  } = useCountryOptions();

  const {
    options: present_division_options,
    isLoading: present_division_isLoading,
  } = useDivisionOptions(presentCountryId);

  const { options: present_district_options } =
    usePresentDistrictOptions(presentDivisionId);

  const {
    options: permanent_country_options,
    isLoading: permanent_country_isLoading,
  } = usePermanentCountryOptions();
  const {
    options: permanent_division_options,
    isLoading: permanent_division_isLoading,
  } = usePermanentDivisionOptions(permanentCountryId);
  const { options: permanent_district_options } =
    usePermanentDistrictOptions(permanentDivisionId);

  const handleCreateSuperAdmin = async (values: FieldValues) => {
    const toastId = toast.loading("Pleace wait...");
    const data = modifyPayload(values);
    try {
      const res = await createSuperAdmin(data);

      if (res.data.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 3000 });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CMForm
      onSubmit={handleCreateSuperAdmin}
      resolver={zodResolver(validationSchema)}
      defaultValues={create_admin_default_values}
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
              name="admin.departmentId"
              label="Department *"
              options={department_options}
              setState={setDepartmentId}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMSelect
              name="admin.designationId"
              fullWidth={true}
              label="Designation *"
              items={designation_options ? designation_options : []}
              isDisabled={departmentId ? false : true}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMInput
              name="admin.web_mail"
              label="Web Gmail"
              size="small"
              fullWidth={true}
            />
          </Grid>{" "}
          <Grid item xs={12} md={12}>
            <CMInput
              name="admin.phone"
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
              name="admin.gender"
              fullWidth={true}
              label="Gender *"
              items={gender_options}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <CMInput
              name="admin.name"
              label="Name *"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMInput
              name="admin.email"
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
              size="small"
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
        Create Super Admin
      </Button>
    </CMForm>
  );
};

export default CreateSuperAdminForm;
