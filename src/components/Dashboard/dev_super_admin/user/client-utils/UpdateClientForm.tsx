import CMForm from "@/components/forms/CMForm";
import CMInput from "@/components/forms/CMInput";
import {
  useGetSingleClientQuery,
  useUpdateClientMutation,
} from "@/redux/api/user/clientApi";
import { filterUndefinedValues } from "@/utils/sanitizeObject";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  client_id: string;
};

const UpdateClientForm = ({ client_id }: TProps) => {
  const { data: client_obj, isLoading } = useGetSingleClientQuery(client_id);
  const client_data = client_obj?.data;
  const [updateClient] = useUpdateClientMutation();
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  const default_values = {
    name_of_entity: client_data?.name_of_entity,
    owner_name: client_data?.owner_name,
    father_name: client_data?.father_name,
    mother_name: client_data?.mother_name,
    phone: client_data?.phone,
    nid: client_data?.nid,
    trade_license: client_data?.trade_license,
    incorporation: client_data?.incorporation,
    e_tin: client_data?.e_tin,
    e_bin: client_data?.e_bin,
    zone: client_data?.zone,
    circle: client_data?.circle,
  };

  const handleUpdateClient = async (values: FieldValues) => {
    const update_client_info = filterUndefinedValues(values);
    const toastId = toast.loading("Updating....", { duration: 3000 });
    try {
      const res = await updateClient({ id: client_id, ...update_client_info });
      console.log(res);
      if (res.data.success) {
        toast.success(res?.data?.message, { id: toastId, duration: 3000 });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!", { id: toastId, duration: 3000 });
    }
  };

  return (
    <CMForm onSubmit={handleUpdateClient} defaultValues={default_values}>
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
          <Typography variant="h5">Basic Information </Typography>
          {client_data?.name_of_entity && (
            <Grid size={12}>
              <CMInput
                name="name_of_entity"
                label={"Company Name"}
                size="small"
                fullWidth={true}
              />
            </Grid>
          )}
          <Grid size={12}>
            <CMInput
              name="owner_name"
              label={"Owner Name"}
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="father_name"
              label={"Father Name"}
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="mother_name"
              label={"Mother Name "}
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="phone"
              label={"Phone"}
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="nid"
              label={"NID NO"}
              size="small"
              fullWidth={true}
            />
          </Grid>
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
          <Typography variant="h5">Official Information</Typography>

          <Grid size={12}>
            <CMInput
              name="trade_license"
              label={"Trade LIcense NO"}
              size="small"
              fullWidth={true}
            />
          </Grid>

          <Grid size={12}>
            <CMInput
              name="incorporation"
              label={"Incorporation NO"}
              type="text"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="e_tin"
              label={"E-TIN NO"}
              type="text"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="e_bin"
              label={"E-BIN NO"}
              type="text"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="zone"
              label={"Zone NO"}
              type="text"
              size="small"
              fullWidth={true}
            />
          </Grid>
          <Grid size={12}>
            <CMInput
              name="circle"
              label={"Circle NO"}
              type="text"
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
          Update Client
        </Button>
      </Box>
    </CMForm>
  );
};

export default UpdateClientForm;
