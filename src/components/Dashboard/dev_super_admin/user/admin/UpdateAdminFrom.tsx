"use client";

import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import CMSelect from "@/components/forms/CMSelect";
import { gender_options } from "@/constants/options";
import { useCountryOptions } from "@/hooks/useCountryOptions";
import { useDepartmentOptions } from "@/hooks/useDepartmentOptions";
import { useDesignationOptions } from "@/hooks/useDesignationOptions";
import { useDivisionOptions } from "@/hooks/useDivisionOptions";
import { usePermanentCountryOptions } from "@/hooks/usePermanentCountryOptions";
import { usePermanentDistrictOptions } from "@/hooks/usePermanentDistrictOptions";
import { usePermanentDivisionOptions } from "@/hooks/usePermanentDivisionOptions";
import { usePresentDistrictOptions } from "@/hooks/usePresentDistrictOptions";
import {
  useGetSingleAdminQuery,
  useUpdateAdminMutation,
} from "@/redux/api/user/adminAip";
import { useCreateSuperAdminMutation } from "@/redux/api/user/userApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid, Stack, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  adminId: string;
};

const UpdateAdminFrom = ({ adminId }: TProps) => {
  const [departmentId, setDepartmentId] = useState<string | null>(null);
  const [presentCountryId, setPresentCountryId] = useState<string | null>(null);

  const [presentDivisionId, setPresentDivisionId] = useState<string | null>(
    null
  );
  const [presentDistrictId, setPresentDistrictId] = useState<string | null>(
    null
  );

  const [permanentCountryId, setPermanentCountryId] = useState<string | null>(
    null
  );
  const [permanentDivisionId, setPermanentDivisionId] = useState<string | null>(
    null
  );

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

  // update api mutation
  const [updateAdmin] = useUpdateAdminMutation();

  // update handler
  const handleCreateSuperAdmin = async (values: FieldValues) => {
    // console.log(values);
    const toastId = toast.loading("Pleace wait...");

    try {
      const res = await updateAdmin({ id: adminId, ...values });
      console.log(res);
      if (res.data.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { id: toastId, duration: 3000 });
    }
  };

  const { data: prev_admin_info, isLoading } = useGetSingleAdminQuery(adminId);
  const admin_data = prev_admin_info?.data;

  useEffect(() => {
    if (admin_data) {
      setPresentDivisionId(admin_data?.presentAddress?.division?.id);
      setPermanentDivisionId(admin_data?.permanentAddress?.division?.id);
    }
  }, [admin_data]);

  if (isLoading) {
    return <p className="text-center my-8">Loading...</p>;
  }

  const default_values = {
    departmentId: admin_data?.department?.id,
    web_mail: admin_data?.web_mail,
    phone: admin_data?.phone,
    designationId: admin_data?.designation?.id,
    name: admin_data?.name,
    gender: admin_data?.gender,

    present_address: {
      countryId: admin_data?.presentAddress?.country?.id,
      divisionId: admin_data?.presentAddress?.division?.id,
      districtId: admin_data?.presentAddress?.district?.id,
      address_line: admin_data?.presentAddress?.address_line,
    },

    permanent_address: {
      countryId: admin_data?.permanentAddress?.country?.id,
      divisionId: admin_data?.permanentAddress?.division?.id,
      districtId: admin_data?.permanentAddress?.district?.id,
      address_line: admin_data?.permanentAddress?.address_line,
    },

    social_links: {
      facebook: admin_data?.socialLink?.facebook,
      twitter: admin_data?.socialLink?.twitter,
      linkedIn: admin_data?.socialLink?.linkedIn,
      instagram: admin_data?.socialLink?.instagram,
    },
  };

  return (
    <CMForm onSubmit={handleCreateSuperAdmin} defaultValues={default_values}>
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
            <CMSelect
              name="departmentId"
              fullWidth={true}
              label="Department *"
              items={department_options}
              setIdValue={setDepartmentId}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMSelect
              name={"designationId"}
              fullWidth={true}
              label="Designation *"
              items={designation_options}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMInput
              name="web_mail"
              label={"Web-Mail *"}
              size="small"
              fullWidth={true}
            />
          </Grid>{" "}
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
              name="gender"
              fullWidth={true}
              label={"Gender *"}
              items={gender_options}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <CMInput
              name="name"
              label={"Name *"}
              size="small"
              fullWidth={true}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <CMInput
              name="phone"
              label={"phone *"}
              type="text"
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
            <CMSelect
              name="present_address.countryId"
              fullWidth={true}
              label={"Country *"}
              items={present_country_options}
              setIdValue={setPresentCountryId}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMSelect
              name="present_address.divisionId"
              fullWidth={true}
              label={"Division *"}
              setIdValue={setPresentDivisionId}
              items={present_division_options}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMSelect
              name="present_address.districtId"
              fullWidth={true}
              label={"District *"}
              setIdValue={setPresentDistrictId}
              items={present_district_options}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <CMInput
              name="present_address.address_line"
              label={"Address Line *"}
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
            <CMSelect
              name="permanent_address.countryId"
              fullWidth={true}
              label={"Country *"}
              items={permanent_country_options}
              setIdValue={setPermanentCountryId}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMSelect
              name="permanent_address.divisionId"
              fullWidth={true}
              label={"Division *"}
              setIdValue={setPermanentDivisionId}
              items={permanent_division_options}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <CMSelect
              name="permanent_address.districtId"
              fullWidth={true}
              label={"District *"}
              items={permanent_district_options}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <CMInput
              name="permanent_address.address_line"
              label={"Address Line *"}
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
              label={"Facebook *"}
              size="small"
              fullWidth={true}
            />
          </Grid>{" "}
          <Grid item xs={12} md={12}>
            <CMInput
              name="social_links.twitter"
              label={"Twitter"}
              size="small"
              fullWidth={true}
            />
          </Grid>{" "}
          <Grid item xs={12} md={12}>
            <CMInput
              name="social_links.linkedIn"
              label={"LinkedIn"}
              size="small"
              fullWidth={true}
            />
          </Grid>{" "}
          <Grid item xs={12} md={12}>
            <CMInput
              name="social_links.instagram"
              label={"Instagram"}
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

export default UpdateAdminFrom;
