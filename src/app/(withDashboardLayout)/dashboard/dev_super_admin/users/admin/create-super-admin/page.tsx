"use client";

import TitleDashboard from "@/components/dashboard/TitleDashboard";
import CMDynamicSelect from "@/components/forms/CMDynamicSelect";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import CMSelect from "@/components/forms/CMSelect";
import { gender_options } from "@/constants/options";
import {
  useGetAllDepartmentQuery,
  useGetAllDesignationQuery,
} from "@/redux/api/user/clientTypeApi";
import { useCreateSuperAdminMutation } from "@/redux/api/user/userApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const adminValidationSchema = z.object({
  department: z.string().nonempty("Department is required"),
  web_mail: z.string().email("please enter a valid email"),
  designation: z.string().nonempty("Degination is required"),
  phone: z.string().regex(/^\d{11}$/, "enter a valid phone number"),
});
export const validationSchema = z.object({
  admin: adminValidationSchema,
});

const CreateSuperAdminPage = () => {
  const router = useRouter();

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

  // if (departmentId) {
  //   designationQueryObj.departmentId = departmentId;
  // }

  // if (presentCountryId) {
  //   presentDivisionObj.countryId = presentCountryId;
  // }

  // if (presentDivisionId) {
  //   presentDistrictObj.divisionId = presentDivisionId;
  // }

  // if (permanentCountryId) {
  //   permanentDivisionObj.countryId = permanentCountryId;
  // }

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
  const { data: desination, isLoading: desinationIsLoading } =
    useGetAllDesignationQuery({});
  console.log(desination);

  const departmentData = data?.data?.data;
  // console.log(departmentData);
  console.log(departmentId);
  const handleCreateSuperAdmin = (values: FieldValues) => {
    console.log("first");
    const data = modifyPayload(values);
    console.log(values);
  };
  return (
    <Box>
      <TitleDashboard title="Create Super Admin" />
      <CMForm
        onSubmit={handleCreateSuperAdmin}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          admin: {
            department: "",
            web_mail: "",
            phone: "",
            designation: "",
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
                name="admin.department"
                fullWidth={true}
                label="Department *"
                options={departmentData ? departmentData : []}
                setIdValue={setDepartmentId}
                idValue={departmentId}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMSelect
                name="admin.designation"
                fullWidth={true}
                label="Designation *"
                items={gender_options}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMInput
                name="admin.web_mail"
                label="Gmail*"
                type="email"
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
          {/* <Grid
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
                label="Gender *"
                items={gender_options}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <CMInput
                name="name"
                label="Name *"
                size="small"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMInput
                name="email"
                label="Gmail*"
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
          </Grid> */}
        </Stack>

        <Stack direction={"row"} gap={4} mt={4}>
          {/* <Grid
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
                name="department"
                fullWidth={true}
                label="Department *"
                items={gender_options}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMSelect
                name="designation"
                fullWidth={true}
                label="Designation *"
                items={gender_options}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMInput
                name="email"
                label="Gmail*"
                type="email"
                size="small"
                fullWidth={true}
              />
            </Grid>{" "}
            <Grid item xs={12} md={12}>
              <CMInput
                name="phone"
                label="Phone *"
                type="text"
                size="small"
                fullWidth={true}
              />
            </Grid>
          </Grid> */}
          {/**
           * ======================================================
           *              Four pera
           * ========================================================
           */}
          {/* <Grid
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
            <Typography variant="h5">Permanent Information</Typography>
            <Grid item xs={12} md={12}>
              <CMSelect
                name="department"
                fullWidth={true}
                label="Department *"
                items={gender_options}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMSelect
                name="designation"
                fullWidth={true}
                label="Designation *"
                items={gender_options}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMInput
                name="email"
                label="Gmail*"
                type="email"
                size="small"
                fullWidth={true}
              />
            </Grid>{" "}
            <Grid item xs={12} md={12}>
              <CMInput
                name="phone"
                label="Phone *"
                type="text"
                size="small"
                fullWidth={true}
              />
            </Grid>
          </Grid> */}
          {/**
           * ======================================================
           *              Fiveth pera
           * ========================================================
           */}
          {/* <Grid
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
              <CMSelect
                name="department"
                fullWidth={true}
                label="Department *"
                items={gender_options}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMSelect
                name="designation"
                fullWidth={true}
                label="Designation *"
                items={gender_options}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMInput
                name="email"
                label="Gmail*"
                type="email"
                size="small"
                fullWidth={true}
              />
            </Grid>{" "}
            <Grid item xs={12} md={12}>
              <CMInput
                name="phone"
                label="Phone *"
                type="text"
                size="small"
                fullWidth={true}
              />
            </Grid>
          </Grid> */}
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
