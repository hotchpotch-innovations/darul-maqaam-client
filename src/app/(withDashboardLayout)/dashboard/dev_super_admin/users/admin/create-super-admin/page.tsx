"use client";

import TitleDashboard from "@/components/dashboard/TitleDashboard";
import CMDynamicSelect from "@/components/forms/CMDynamicSelect";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import CMSelect from "@/components/forms/CMSelect";
import { gender_options } from "@/constants/options";
import {
  useGetAllcountrysQuery,
  useGetAllDepartmentQuery,
  useGetAllDesignationQuery,
  useGetAllDistrictQuery,
  useGetAllDivisionQuery,
} from "@/redux/api/user/clientTypeApi";
import { useCreateSuperAdminMutation } from "@/redux/api/user/userApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const adminValidationSchema = z.object({
  departmentId: z.string().nonempty("Department is required"),
  web_mail: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  designationId: z.string().nonempty("Degination is required"),
  phone: z.string().regex(/^\d{11}$/, "enter a valid phone number"),
  name: z.string().min(1, "please enter name"),
  email: z.string().email("please enter a valid email"),
  gender: z.string().nonempty("gender is required"),
});

export const present_addressValidationSchema = z.object({
  countryId: z.string().nonempty("Department is required"),
  divisionId: z.string().nonempty("Department is required"),
  districtId: z.string().nonempty("Department is required"),
  address_line: z.string().min(1, "please enter name"),
});

export const social_linksValidationSchema = z.object({
  facebook: z.string().url().min(1, "Please give Facebook ID URL"), // required
  twitter: z.string().optional(), // optional
  linkedIn: z.string().optional(), // optional
  instagram: z.string().optional(), // optional
});

export const validationSchema = z.object({
  password: z.string().min(6, "passrword must be at least 6 character"),
  admin: adminValidationSchema,
  present_address: present_addressValidationSchema,
  permanent_address: present_addressValidationSchema,
  social_links: social_linksValidationSchema,
});

type TQueryObj = {
  departmentId?: string | null;
  countryId?: string;
  divisionId?: string;
};

const CreateSuperAdminPage = () => {
  const queryObj: TQueryObj = {};
  const divisionObj: TQueryObj = {};
  const districtObj: TQueryObj = {};

  const [departmentId, setDepartmentId] = useState<string | null>(null);

  const [designationId, setDesignationId] = useState<string | null>(null);
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
  const [permanentDistrictId, setPermanentDistrictId] = useState<string | null>(
    null
  );

  if (departmentId) {
    queryObj["departmentId"] = departmentId;
  }

  // if (presentCountryId) {
  //   presentDivisionObj.countryId = presentCountryId;
  // }

  if (presentDivisionId) {
    districtObj["divisionId"] = presentDivisionId;
  }

  if (permanentCountryId) {
    divisionObj["countryId"] = permanentCountryId;
  }

  // if (permanentDivisionId) {
  //   permanentDistrictObj.divisionId = permanentDivisionId;
  // }

  const [createSuperAdmin] = useCreateSuperAdminMutation();

  // // Create department options
  // const { options: department_options } = useDepartmentOption(departmentQueryObj);

  // // Create designation options
  // const { options: designation_options } = useDesignationOption(designationQueryObj, { skip: !departmentId });

  // // Create present country options
  // const { options: present_country_options } = useCountryOption(presentCountryObj);

  // // Create present division options
  // const { options: present_division_options } = useDivisionOption(presentDivisionObj, { skip: !presentCountryId });

  // // Create present district options
  // const { options: present_district_options } = useDistrictOption(presentDistrictObj, { skip: !presentDivisionId });

  // // Create permanent country options
  // const { options: permanent_country_options } = useCountryOption(permanentCountryObj);

  // // Create permanent division options
  // const { options: permanent_division_options } = useDivisionOption(permanentDivisionObj, { skip: !permanentCountryId });

  // // Create permanent district options
  // const { options: permanent_district_options } = useDistrictOption(permanentDistrictObj, { skip: !permanentDivisionId });

  const { data, isLoading } = useGetAllDepartmentQuery({});
  const { data: designations, isLoading: designationsLoading } =
    useGetAllDesignationQuery({ ...queryObj });
  const { data: countries, isLoading: countriesLoading } =
    useGetAllcountrysQuery({});
  const { data: divisions, isLoading: divisionsLoading } =
    useGetAllDivisionQuery({ ...divisionObj });
  const { data: districts, isLoading: districtsLoading } =
    useGetAllDistrictQuery({ ...districtObj });

  const departmentData = data?.data?.data;
  const designationsData = designations?.data?.data;
  const countriesData = countries?.data?.data;
  const divisionsData = divisions?.data?.data;
  const districtsData = districts?.data?.data;
  console.log(districtsData);

  const handleCreateSuperAdmin = async (values: FieldValues) => {
    const toastId = toast.loading("Pleace wait...");
    const data = modifyPayload(values);
    try {
      const res = await createSuperAdmin(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <TitleDashboard title="Create Super Admin" />
      <CMForm
        onSubmit={handleCreateSuperAdmin}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          password: "",
          admin: {
            departmentId: "",
            web_mail: "",
            phone: "",
            designationId: "",
            name: "",
            email: "",
            gender: "",
          },
          present_address: {
            countryId: "",
            divisionId: "",
            districtId: "",
            address_line: "",
          },
          permanent_address: {
            countryId: "",
            divisionId: "",
            districtId: "",
            address_line: "",
          },
          social_links: {
            facebook: "",
            twitter: "",
            linkedIn: "",
            instagram: "",
          },
        }}
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
              <CMDynamicSelect
                name="admin.departmentId"
                fullWidth={true}
                label="Department *"
                options={departmentData ? departmentData : []}
                setIdValue={setDepartmentId}
                // idValue={departmentId}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMSelect
                name="admin.designationId"
                fullWidth={true}
                label="Designation *"
                items={designationsData ? designationsData : []}
                isDisabled={departmentId ? false : true}
                setIdValue={setDesignationId}
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
              <CMSelect
                name="present_address.countryId"
                fullWidth={true}
                label="Country *"
                items={countriesData ? countriesData : []}
                setIdValue={setPresentCountryId}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMSelect
                name="present_address.divisionId"
                fullWidth={true}
                label="Division *"
                setIdValue={setPresentDivisionId}
                items={divisionsData ? divisionsData : []}
                isDisabled={presentCountryId ? false : true}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMSelect
                name="present_address.districtId"
                fullWidth={true}
                label="District *"
                items={districtsData ? districtsData : []}
                isDisabled={presentDivisionId ? false : true}
                setIdValue={setPresentDistrictId}
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
              <CMSelect
                name="permanent_address.countryId"
                fullWidth={true}
                label="Country *"
                items={countriesData ? countriesData : []}
                setIdValue={setPermanentCountryId}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMSelect
                name="permanent_address.divisionId"
                fullWidth={true}
                label="Division *"
                setIdValue={setPermanentDivisionId}
                items={divisionsData ? divisionsData : []}
                isDisabled={presentCountryId ? false : true}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMSelect
                name="permanent_address.districtId"
                fullWidth={true}
                label="District *"
                items={districtsData ? districtsData : []}
                isDisabled={presentDivisionId ? false : true}
                setIdValue={setPermanentDistrictId}
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
          Register
        </Button>
      </CMForm>
    </Box>
  );
};

export default CreateSuperAdminPage;
