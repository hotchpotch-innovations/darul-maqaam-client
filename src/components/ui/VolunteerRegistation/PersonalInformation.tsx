import { Box, Stack, Typography } from "@mui/material";
import InputBox from "./InputBox";
import SelectBox from "./SelectBox";
import Textaria from "./Textaria";

const PersonalInformation = () => {
  const occupation_options = [
    {
      label: "IMAAM-KHATIB",
      value: "imaam-khatib",
    },
    {
      label: "MUAZZIN",
      value: "muazzin",
    },
    {
      label: "DOCTOR",
      value: "doctor",
    },
    {
      label: "TEACHER",
      value: "teacher",
    },
    {
      label: "WRITER",
      value: "writer",
    },
    {
      label: "BUSINESS MAN",
      value: "businessMan",
    },
    {
      label: "OTHER",
      value: "other",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h6" pb={3}>
        Personal Information
      </Typography>
      <Stack direction={"column"} gap={3}>
        <InputBox
          name={"name"}
          label={"Name"}
          placeholder={"Your Name"}
          type={"text"}
        />
        <InputBox
          name={"phone"}
          label={"Phone"}
          placeholder={"Your Phone Number"}
          type={"text"}
        />
        <InputBox
          name={"emergencyPhoneNumber"}
          label={"Emergency Phone Number"}
          placeholder={"Emergency Phone Number"}
          type={"text"}
        />
        <InputBox
          name={"email"}
          label={"Email"}
          placeholder={"Your Email"}
          type={"email"}
        />
        <InputBox
          name={"facebookID"}
          label={"Fackbook Id link"}
          placeholder={"Fackbook Id Link"}
          type={"text"}
        />
        <InputBox
          name={"NID"}
          label={"NID Number"}
          placeholder={"15943873549325"}
          type={"text"}
        />
        <InputBox
          name={"education"}
          label={"Educational Information"}
          placeholder={"JSC, SSC, HSC, BA, Other"}
          type={"text"}
        />
        <SelectBox options={occupation_options} />
        <InputBox
          name={"institute"}
          label={"Institute Name"}
          placeholder={"Dhaka University"}
          type={"text"}
        />
        <Textaria name={"summary"} label={"Summary"} placeholder={"Summary"} />
        <Textaria
          name={"volunteerFor"}
          label={"Volunteer For"}
          placeholder={"Volunteer For"}
        />
        <Textaria
          name={"specialSkill"}
          label={"Special Skill"}
          placeholder={"Special Skill"}
        />
      </Stack>
    </Box>
  );
};

export default PersonalInformation;
