"use client";

import CMForm from "@/components/Forms/CMForm";
import CMInput from "@/components/Forms/CMInput";
import CMSelect from "@/components/Forms/CMSelect";
import { gender_options } from "@/constants/options";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Stack } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

export const validationSchema = z.object({
  department: z.string().nonempty("Department"),
  email: z.string().email("please enter a valid email"),
  designation: z.string().nonempty("Degination is required"),
  phone: z.string().regex(/^\d{11}$/, "enter a valid phone number"),
});

const page = () => {
  const handleCreateDevSuperAdmin = (values: FieldValues) => {
    console.log("first");
    const data = modifyPayload(values);
    console.log(values);
  };
  return (
    <Box>
      <CMForm
        onSubmit={handleCreateDevSuperAdmin}
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
          <Grid item xs={3} md={6} container bgcolor={"red"} p={4}>
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
          <Grid item xs={3} md={6} container bgcolor={"red"} p={4}>
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
          <Grid item xs={3} md={4} container bgcolor={"red"} p={2}>
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
          <Grid item xs={3} md={4} container bgcolor={"red"} p={2}>
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
          <Grid item xs={3} md={4} container bgcolor={"red"} p={2}>
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
