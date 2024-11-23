"use client";

import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import CMSelect from "@/components/forms/CMSelect";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import { gender_options } from "@/constants/options";
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

import {
  useGetSingleEmployeeQuery,
  useUpdateEmployeeMutation,
} from "@/redux/api/user/employeeApi";
// import { useCreateSuperAdminMutation } from "@/redux/api/user/userApi";
import { TSocialLinkPayload } from "@/types";
import { customTimeOut } from "@/utils/customTimeOut";
// import { removeNullValues } from "@/utils/removeNullValues";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";

import {
  // useEffect,
  useState,
} from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  employee_id: string;
};

const UpdateEmployeeForm = ({ employee_id }: TProps) => {
  const router = useRouter();
  const designationQueryObj: TDesignationQueryObj = {};
  // const presentDivisionQueryObj: TDivisionQueryObj = {};
  // const permanentDivisionQueryObj: TDivisionQueryObj = {};
  // const presentDistrictQueryObj: TDistrictQueryObj = {};
  // const permanentDistrictQueryObj: TDistrictQueryObj = {};

  // State Declarations
  const [departmentId, setDepartmentId] = useState(null);

  // // Present
  const [presentCountryId, setPresentCountryId] = useState(null);
  // const [presentDivisionId, setPresentDivisionId] = useState(null);

  // // Permanent
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

  const { options: department_options } = useDepartmentOptions();
  const { options: designation_options } =
    useDesignationOptions(designationQueryObj);

  // Set Present Query Options
  const { options: present_country_options } = useCountryOptions();

  // const { options: present_division_options } = useDivisionOptions(
  //   presentDistrictQueryObj
  // );
  // const { options: present_district_options } = useDistrictOptions(
  //   presentDistrictQueryObj
  // );

  // Set Permanent Query Options
  const { options: permanent_country_options } = useCountryOptions();

  // const { options: permanent_division_options } = useDivisionOptions(
  //   permanentDivisionQueryObj
  // );
  // const { options: permanent_district_options } = useDistrictOptions(
  //   permanentDistrictQueryObj
  // );

  // update api mutation
  const [updateEmployee] = useUpdateEmployeeMutation();

  // update handler
  const handleUpdateEmployee: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Please wait...");
    const { social_links, ...payload } = values;
    const { facebook, instagram, linkedIn, twitter } = social_links;
    const socialLinkPayload: TSocialLinkPayload = {};

    if (facebook) {
      socialLinkPayload["facebook"] = facebook;
    }
    if (instagram) {
      socialLinkPayload["instagram"] = instagram;
    }
    if (linkedIn) {
      socialLinkPayload["linkedIn"] = linkedIn;
    }
    if (twitter) {
      socialLinkPayload["twitter"] = twitter;
    }

    if (Object.keys(socialLinkPayload).length > 0) {
      payload["social_links"] = {
        ...socialLinkPayload,
      };
    }

    try {
      const res = await updateEmployee({
        id: employee_id,
        ...payload,
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/dashboard/dev_super_admin/users/employee/manage");
      } else {
        console.log(res);
        toast.error(res?.message, {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message, { id: toastId, duration: 3000 });
      customTimeOut(3000).then(() => window?.location?.reload());
    }
  };

  const { data: prev_employee_info, isLoading } =
    useGetSingleEmployeeQuery(employee_id);
  const employee_data = prev_employee_info?.data;

  // useEffect(() => {
  //   if (employee_data) {
  //     setPresentDivisionId(employee_data?.presentAddress?.division?.id);
  //     setPermanentDivisionId(employee_data?.permanentAddress?.division?.id);
  //   }
  // }, [employee_data]);

  if (isLoading) {
    return <p className="text-center my-8">Loading...</p>;
  }

  const default_values = {
    departmentId: employee_data?.department?.id,
    web_mail: employee_data?.web_mail,
    phone: employee_data?.phone,
    designationId: employee_data?.designation?.id,
    name: employee_data?.name,
    gender: employee_data?.gender,

    present_address: {
      countryId: employee_data?.presentAddress?.country?.id,
      // divisionId: employee_data?.presentAddress?.division?.id,
      // districtId: employee_data?.presentAddress?.district?.id,
      state: employee_data?.presentAddress?.state,
      city: employee_data?.presentAddress?.city,
      address_line: employee_data?.presentAddress?.address_line,
    },

    permanent_address: {
      countryId: employee_data?.permanentAddress?.country?.id,
      // divisionId: employee_data?.permanentAddress?.division?.id,
      // districtId: employee_data?.permanentAddress?.district?.id,
      state: employee_data?.permanentAddress?.state,
      city: employee_data?.permanentAddress?.city,
      address_line: employee_data?.permanentAddress?.address_line,
    },

    social_links: {
      facebook: employee_data?.socialLink?.facebook,
      twitter: employee_data?.socialLink?.twitter,
      linkedIn: employee_data?.socialLink?.linkedIn,
      instagram: employee_data?.socialLink?.instagram,
    },
  };

  return (
    <CMForm onSubmit={handleUpdateEmployee} defaultValues={default_values}>
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
              options={department_options}
              setState={setDepartmentId}
            />
          </Grid>
          <Grid size={12}>
            <CMSelect
              name={"designationId"}
              fullWidth={true}
              label="Designation *"
              items={designation_options}
            />
          </Grid>
          <Grid size={12}>
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
              name="gender"
              fullWidth={true}
              label={"Gender *"}
              items={gender_options}
            />
          </Grid>

          <Grid size={12}>
            <CMInput
              name="name"
              label={"Name *"}
              size="small"
              fullWidth={true}
            />
          </Grid>

          <Grid size={12}>
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
              label={"Country *"}
              options={present_country_options}
              setState={setPresentCountryId}
            />
          </Grid>
          <Grid size={12}>
            {/* <CMSelectWithWatch
              name="present_address.divisionId"
              label={"Division *"}
              setState={setPresentDivisionId}
              options={present_division_options}
            /> */}

            <CMInput
              name="present_address.state"
              label="State *"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            {/* <CMSelect
              name="present_address.districtId"
              label={"District *"}
              items={present_district_options}
            /> */}
            <CMInput
              name="present_address.city"
              label="City *"
              size="small"
              fullWidth={true}
            />
          </Grid>

          <Grid size={12}>
            <CMInput
              name="present_address.address_line"
              label={"Address Line *"}
              size="small"
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
              label={"Country *"}
              options={permanent_country_options}
              setState={setPermanentCountryId}
            />
          </Grid>
          <Grid size={12}>
            {/* <CMSelectWithWatch
              name="permanent_address.divisionId"
              label={"Division *"}
              setState={setPermanentDivisionId}
              options={permanent_division_options}
            /> */}
            <CMInput
              name="permanent_address.state"
              label="State *"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            {/* <CMSelect
              name="permanent_address.districtId"
              label={"District *"}
              items={permanent_district_options}
            /> */}
            <CMInput
              name="permanent_address.city"
              label="City *"
              size="small"
              fullWidth={true}
            />
          </Grid>

          <Grid size={12}>
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
              label={"Facebook *"}
              size="small"
              fullWidth={true}
            />
          </Grid>{" "}
          <Grid size={12}>
            <CMInput
              name="social_links.twitter"
              label={"Twitter"}
              size="small"
              fullWidth={true}
            />
          </Grid>{" "}
          <Grid size={12}>
            <CMInput
              name="social_links.linkedIn"
              label={"LinkedIn"}
              size="small"
              fullWidth={true}
            />
          </Grid>{" "}
          <Grid size={12}>
            <CMInput
              name="social_links.instagram"
              label={"Instagram"}
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
        >
          Update
        </Button>
      </Box>
    </CMForm>
  );
};

export default UpdateEmployeeForm;
