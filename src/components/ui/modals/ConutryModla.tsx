import { Box, Button, Grid, Typography } from "@mui/material";
import CMModal from "../CMModal";
import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import { useUpdateClientTypeMutation } from "@/redux/api/user/settings/clientTypeApi";

import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { useUpdateCountryMutation } from "@/redux/api/user/settings/countryApi";

type TCountryProps = {
  setState: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  obj: any;
};

const ConutryModla = ({ obj, setState, open }: TCountryProps) => {
  const modal_id = obj?.id;
  const handleClose = () => setState(false);

  const default_value = {
    name: obj?.name,
    currency: obj?.currency,
    code: obj?.code,
    iso3: obj?.iso3,
    phone_code: obj?.phone_code,
  };

  const [updateCountry] = useUpdateCountryMutation();
  const handleUpdate = async (values: FieldValues) => {
    console.log(values, modal_id);
    const toastId = toast.loading("Please wait...");
    try {
      const res = await updateCountry({ ...values, id: obj?.id }).unwrap();
      console.log({ res });
      if (res?.success) {
        handleClose();
        toast.success(res?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { duration: 3000 });
    }

    console.log();
  };

  return (
    <CMModal open={open} id={modal_id} handleClose={handleClose}>
      <Box>
        <Typography variant="h4" component="h4" mb={4}>
          Update Country
        </Typography>
        <CMForm onSubmit={handleUpdate} defaultValues={default_value}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <CMInput name="name" label="Name" fullWidth />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMInput name="currency" label="Currency" fullWidth />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMInput name="code" label="Code" fullWidth />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMInput name="iso3" label="iso3" fullWidth />
            </Grid>
            <Grid item xs={12} md={12}>
              <CMInput name="phone_code" label="Phone Code" fullWidth />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              mt: 2,
              gap: 3,
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleClose()}
            >
              Close
            </Button>
            <Button type="submit">Update</Button>
          </Box>
        </CMForm>
      </Box>
    </CMModal>
  );
};

export default ConutryModla;
