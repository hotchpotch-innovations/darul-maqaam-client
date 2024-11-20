import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import { useCountryOptions } from "@/hooks/useCountryOptions";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

const ProfileData = () => {
  const [presentCountryId, setPresentCountryId] = useState(null);
  const [permanentCountryId, setPermanentCountryId] = useState(null);

  const { options: present_country_options } = useCountryOptions();

  const handleUpdate = () => {
    console.log("Profile Update");
  };

  const default_values = {
    departmentId: 101,
    name: "John Doe",
    gender: "Male",
    web_mail: "admin@example.com",
    phone: "+1 234 567 890",
    designationId: 202,

    present_address: {
      countryId: present_country_options,
      state: "California",
      city: "Los Angeles",
      address_line: "123 Sunset Blvd, Apt 101",
    },

    permanent_address: {
      countryId: 1,
      state: "Texas",
      city: "Houston",
      address_line: "456 Oak Street, Suite 202",
    },

    social_links: {
      facebook: "https://facebook.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      linkedIn: "https://linkedin.com/in/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
  };

  return (
    <CMForm onSubmit={handleUpdate} defaultValues={default_values}>
      <Stack spacing={2}>
        <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
          <CMInput name="name" fullWidth={true} label="Name" size="small" />
          <CMInput name="gender" fullWidth={true} label="Gender" size="small" />
        </Stack>

        <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
          <CMInput
            name="web_mail"
            fullWidth={true}
            label="Web Mail"
            size="small"
            readOnly={true}
          />
          <CMInput name="phone" fullWidth={true} label="Phone" size="small" />
        </Stack>

        {/* Present Address Start */}
        <Typography pt={2} variant="body1" fontWeight="500">
          Present Address:
        </Typography>
        <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
          <CMSelectWithWatch
            name="present_address.countryId"
            label={"Country"}
            // options={present_country_options}
            setState={setPresentCountryId}
          />
          <CMInput
            name="present_address.state"
            fullWidth={true}
            label="State"
            size="small"
          />
        </Stack>
        <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
          <CMInput
            name="present_address.city"
            fullWidth={true}
            label="City"
            size="small"
          />

          <CMInput
            name="present_address.address_line"
            fullWidth={true}
            label="Address Line"
            size="small"
          />
        </Stack>
        {/* Present Address End */}

        {/* Permanent Address Start */}
        <Typography pt={2} variant="body1" fontWeight="500">
          Permanent Address:
        </Typography>
        <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
          <CMSelectWithWatch
            name="permanent_address.countryId"
            label={"Country"}
            // options={}
            setState={setPermanentCountryId}
          />
          <CMInput
            name="permanent_address.state"
            fullWidth={true}
            label="State"
            size="small"
          />
        </Stack>
        <Stack spacing={2} direction={{ xs: "column", lg: "row" }}>
          <CMInput
            name="permanent_address.city"
            fullWidth={true}
            label="City"
            size="small"
          />

          <CMInput
            name="permanent_address.address_line"
            fullWidth={true}
            label="Address Line"
            size="small"
          />
        </Stack>
        {/* Permanent Address End */}
      </Stack>
    </CMForm>
  );
};

export default ProfileData;
