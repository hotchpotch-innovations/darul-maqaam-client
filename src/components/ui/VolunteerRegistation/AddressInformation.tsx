"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import InputBox from "./InputBox";
import Textaria from "./Textaria";
import Link from "next/link";

const AddressInformation = () => {
  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: {
          xs: "40px",
          md: "10px",
        },
      }}
    >
      <Stack>
        <Stack>
          <Typography variant="h6" pb={3}>
            Permanent Address
          </Typography>
          <Stack direction={"column"} gap={3}>
            <InputBox
              name={"district"}
              label={"District / Thana"}
              placeholder={"District / Thana"}
              type={"text"}
            />

            <Textaria
              name={"pAddress"}
              label={"Address"}
              placeholder={"Sector-3, Uttara, Dhaka"}
            />
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="h6" py={3}>
            Present Address
          </Typography>
          <Stack direction={"column"} gap={3}>
            <InputBox
              name={"district"}
              label={"District / Thana"}
              placeholder={"District / Thana"}
              type={"text"}
            />

            <Textaria
              name={"pAddress"}
              label={"Address"}
              placeholder={"Sector-3, Uttara, Dhaka"}
            />
          </Stack>
        </Stack>

        <Link href={"/"} className="flex justify-end pt-6">
          <Button
            sx={{
              width: "50%",
            }}
            onClick={() => alert("This feature is coming soon...")}
          >
            Send My Application
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default AddressInformation;
