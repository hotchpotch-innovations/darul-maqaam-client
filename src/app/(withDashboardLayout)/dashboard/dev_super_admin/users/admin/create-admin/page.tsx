"use client";

import TitleDashboard from "@/components/dashboard/TitleDashboard";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import CMSelect from "@/components/forms/CMSelect";
import { gender_options } from "@/constants/options";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const validationSchema = z.object({
  department: z.string().nonempty("Department"),
  email: z.string().email("please enter a valid email"),
  designation: z.string().nonempty("Degination is required"),
  phone: z.string().regex(/^\d{11}$/, "enter a valid phone number"),
});

const page = () => {
  const handleCreateSuperAdmin = (values: FieldValues) => {
    const data = modifyPayload(values);
  };

  return (
    <Box>
      <TitleDashboard title="Create Admin" />
      <CMForm
        onSubmit={handleCreateSuperAdmin}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          department: "",
          email: "",
          phone: "",
          designation: "",
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
          </Grid>
        </Stack>

        <Stack direction={"row"} gap={4} mt={4}>
          {/**
           * ======================================================
           *              Third pera
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
          </Grid>
          {/**
           * ======================================================
           *              Fiveth pera
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

export default page;
