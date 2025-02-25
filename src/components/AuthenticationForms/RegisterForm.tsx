"use client";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import CMForm from "../forms/CMForm";
import { zodResolver } from "@hookform/resolvers/zod";
import CMSelectWithWatch from "../forms/CMSelectWithWatch";
import CMInput from "../forms/CMInput";
import CMSelect from "../forms/CMSelect";
import { gender_options } from "@/constants/options";
import Link from "next/link";
import { z } from "zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerClient } from "@/services/actions/registerUser";
import { userSignIn } from "@/services/actions/userSignIn";
import { setToLocalStorage } from "@/utils/local-starage";
import { authkey } from "@/constants/authkey";
import { useClientTypeOption } from "@/hooks/useClientTypeOptions";
import { TResponseDataObj } from "@/types";
import { useGetSingleClientTypeQuery } from "@/redux/api/user/settings/clientTypeApi";
import CMPasswordInput from "../forms/without_form_state_fields/CMPasswordInput";

const clientValidationSchema = z.object({
  owner_name: z.string().min(1, "please enter your name"),
  email: z.string().email("please enter a valid email"),
  gender: z.string().nonempty("Gender is required"),
  phone: z.string().regex(/^\d{11}$/, "enter a valid phone number"),
  // clientTypeId: z.string().nonempty("please Select Account Type").optional(),
  clientTypeId: z
    .string({ required_error: "please Select Account Type" })
    .optional(),
  name_of_entity: z.string({ required_error: "Please entity name" }).optional(),
});

const validationSchema = z.object({
  password: z.string().min(6, "password must be at least 6 character"),
  client: clientValidationSchema,
});

const RegisterForm = () => {
  const [clientType, setClientType] = useState("");

  const handleRegister: SubmitHandler<FieldValues> = async (values) => {
    const { client, password } = values;
    const { clientTypeId, ...client_data } = client;

    if (!clientTypeId && clientType) {
      client_data["clientTypeId"] = clientType;
    }

    const payload_data = {
      password: password,
      client: client_data,
    };

    const toastId = toast.loading("Please wait...");
    const payload = modifyPayload(payload_data);
    try {
      const res = await registerClient(payload);
      if (res?.data?.id) {
        toast.success(res?.message, { id: toastId, duration: 5000 });
        const result = await userSignIn({
          password: values?.password,
          email: values?.client?.email,
        });
        if (result?.success) {
          const access_token = result?.data?.accessToken;
          toast.success(result?.message, { id: toastId, duration: 2000 });
          setToLocalStorage(authkey, access_token);
        } else {
          toast.error(result?.message, { id: toastId, duration: 3000 });
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const { options: client_type_options, isLoading } = useClientTypeOption();

  useEffect(() => {
    if (client_type_options.length === 1) {
      console.log(client_type_options);
      const clientTypeId = client_type_options[0].value;
      setClientType(clientTypeId);
    }
  }, [client_type_options, clientType]);

  const client = {
    owner_name: "",
    email: "",
    phone: "",
    gender: "",
    clientTypeId: "",
  };

  const default_values = {
    password: "",
    client: client,
  };

  const { data } = useGetSingleClientTypeQuery(clientType, {
    refetchOnFocus: !!clientType,
  });
  const is_company = data as TResponseDataObj;
  const isCompany = is_company?.data?.identifier;

  if (isLoading) {
    return <Typography>Loading</Typography>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        padding: "10px 20px",
      }}
    >
      <CMForm
        onSubmit={handleRegister}
        resolver={zodResolver(validationSchema)}
        defaultValues={default_values}
      >
        <Grid container spacing={2}>
          {client_type_options?.length > 1 && (
            <Grid size={12}>
              <CMSelectWithWatch
                setState={setClientType}
                name="client.clientTypeId"
                label="Account Type *"
                options={client_type_options}
                // defaultValue={clientType ? clientType : ""}
              />
            </Grid>
          )}

          {isCompany === "company" && (
            <Grid size={12}>
              <CMInput
                name="client.name_of_entity"
                label="Company Name *"
                // {...register("client.owner_name")}
                fullWidth={true}
              />
            </Grid>
          )}

          <Grid size={12}>
            <CMInput
              name="client.owner_name"
              label="Name *"
              // {...register("client.owner_name")}
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <CMInput
              name="client.phone"
              label="Contact Number *"
              type="tel"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <CMSelect
              name="client.gender"
              fullWidth={true}
              label="Gender *"
              items={gender_options}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <CMInput
              name="client.email"
              label="Email *"
              type="email"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <CMPasswordInput
              name="password"
              label="Password"
              size="small"
              fullWidth={true}
              required={true}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          sx={{
            mt: "30px",
            display: "block",
            mx: "auto",
            width: "40%",
          }}
        >
          Register
        </Button>

        <Typography textAlign={"center"} py={2}>
          Already have an account?{" "}
          <Link href={"/login"}>
            <span className="text-blue-500">Login</span>
          </Link>
        </Typography>
      </CMForm>
    </Box>
  );
};

export default RegisterForm;
