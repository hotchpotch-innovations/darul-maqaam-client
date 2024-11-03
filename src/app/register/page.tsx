"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import loginImage from "../../../public/images/login-blue-logo.png";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import CMForm from "@/components/forms/CMForm";
import Link from "next/link";
import CMInput from "@/components/forms/CMInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import CMSelect from "@/components/forms/CMSelect";
import { registerClient } from "@/services/actions/registerUser";
import { gender_options } from "@/constants/options";
import { useClientTypeOption } from "../../hooks/useClientTypeOptions";
import CMSelectWithWatch from "@/components/forms/CMSelectWithWatch";
import { useGetSingleClientTypesQuery } from "@/redux/api/user/clientTypeApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { TResponseDataObj } from "@/types";
import { storeUserInfo } from "@/services/auth.Services.Loacl";

const clientValidationSchema = z.object({
  owner_name: z.string().min(1, "please enter your name"),
  email: z.string().email("please enter a valid email"),
  gender: z.string().nonempty("Gender is required"),
  phone: z.string().regex(/^\d{11}$/, "enter a valid phone number"),
  clientTypeId: z.string().nonempty("pleace Select Account Type"),
  name_of_entity: z.string({ required_error: "Pleace entity name" }).optional(),
});

const validationSchema = z.object({
  password: z.string().min(6, "passrword must be at least 6 character"),
  client: clientValidationSchema,
});

const RegisterPage = () => {
  const router = useRouter();
  const [clientType, setClientType] = useState(null);

  const handleRegister = async (values: FieldValues) => {
    console.log(values);
    const toastId = toast.loading("Pleace wait...");
    const payload = modifyPayload(values);
    try {
      const res = await registerClient(payload);
      if (res?.data?.id) {
        toast.success(res?.message, { id: toastId, duration: 5000 });
        const result = await userLogin({
          password: values?.password,
          email: values?.client?.email,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const { options: client_type_options, isLoading } = useClientTypeOption();

  const { data } = useGetSingleClientTypesQuery(clientType, {
    refetchOnFocus: !!clientType,
  });

  const is_company = data as TResponseDataObj;

  const isCompany = is_company?.data?.identifier;

  if (isLoading) {
    return <Typography>Loading</Typography>;
  }

  return (
    <Container>
      <title>CM | User Register</title>;
      <Stack
        gap={1}
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ maxWidth: "600px", width: "100%", boxShadow: "1" }} pt={4}>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Image
              src={loginImage}
              alt="Login Logo Image "
              height={60}
              width={60}
              className="h-auto w-auto"
            />
            <Typography variant="h5" pt={2} pb={1}>
              {" "}
              Register Here
            </Typography>

            <Box
              sx={{
                width: "100%",
                padding: "10px 20px",
              }}
            >
              <CMForm
                onSubmit={handleRegister}
                resolver={zodResolver(validationSchema)}
                defaultValues={{
                  password: "",
                  client: {
                    owner_name: "",
                    email: "",
                    phone: "",
                    gender: "",
                    clientTypeId: "",
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <CMSelectWithWatch
                      setState={setClientType}
                      name="client.clientTypeId"
                      label="Account Type *"
                      options={client_type_options}
                    />
                  </Grid>

                  {isCompany === "company" && (
                    <Grid item xs={12} md={12}>
                      <CMInput
                        name="client.name_of_entity"
                        label="Comapny Name *"
                        // {...register("client.owner_name")}
                        fullWidth={true}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} md={12}>
                    <CMInput
                      name="client.owner_name"
                      label="Name *"
                      // {...register("client.owner_name")}
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CMInput
                      name="client.email"
                      label="Email *"
                      type="email"
                      size="small"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CMInput
                      name="password"
                      label="Password *"
                      type="password"
                      size="small"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CMInput
                      name="client.phone"
                      label="Contact Number *"
                      type="tel"
                      size="small"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CMSelect
                      name="client.gender"
                      fullWidth={true}
                      label="Gender *"
                      items={gender_options}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    mt: "30px",
                  }}
                >
                  Register
                </Button>

                <Typography textAlign={"center"} py={2}>
                  Do you already have an account?{" "}
                  <Link href={"/login"}>
                    <span className="text-blue-500">Login</span>
                  </Link>
                </Typography>
              </CMForm>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
